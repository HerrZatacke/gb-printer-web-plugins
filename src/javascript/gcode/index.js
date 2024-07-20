
const defaultGlobalPrefix = `
G21 # All distances and positions are in mm
G90 # Distances and positions are absolute
G94 # Units/min mode at the current F rate
F35 # Feed rate
G00 Z1 # Travel Height
`;

const defaultGlobalSuffix = `
G00 Z1 # Travel Height
M05 # Spindle Off
G00 X0Y0 # Home
`;

const defaultGroupPrefix = `
G00 Z20 # Lift tool up
M0 # Pause until user interaction
G00 Z1 # Travel height
M03 S10000 # Spindle on
G4 P1 # 1s pause
`;

const defaultGroupSuffix = `
G00 Z1 # Travel Height
M05 # Spindle Off
G00 X0Y0 # Home
`;

const lookupPalette = [
  '#000000',
  '#ff0000',
  '#00ff00',
  '#0000ff',
];

const getCanvasOpts = {
  handleExportFrame: 'crop',
  palette: {
    palette: lookupPalette,
  },
};

class Gcode {
  constructor(env, config) {
    this.name = 'G-Code';
    this.description = 'Creates gcode from your image. Use {x} and {y} for coordinates. Use double hash `##` to entirely remove line from final file';
    this.configParams = {
      globalPrefix: {
        label: 'Global prefix',
        type: 'multiline',
      },
      globalSuffix: {
        label: 'Global suffix',
        type: 'multiline',
      },
      groupPrefix: {
        label: 'Group prefix',
        type: 'multiline',
      },
      groupSuffix: {
        label: 'Group suffix',
        type: 'multiline',
      },
      d1: {
        label: 'Path 1 (white)',
        type: 'multiline',
      },
      d2: {
        label: 'Path 2 (light grey)',
        type: 'multiline',
      },
      d3: {
        label: 'Path 3 (dark grey)',
        type: 'multiline',
      },
      d4: {
        label: 'Path 4 (black)',
        type: 'multiline',
      },
    };

    this.config = {};
    this.snippets = [];
    this.saveAs = env.saveAs;
    this.progress = env.progress;
    this.collectImageData = env.collectImageData;
    this.setConfig(config);
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);
    this.config.d1 = this.config.d1 || '# White';
    this.config.d2 = this.config.d2 || '# Light Grey';
    this.config.d3 = this.config.d3 || '# Dark Grey';
    this.config.d4 = this.config.d4 || '# Black';
    this.config.globalPrefix = this.config.globalPrefix || defaultGlobalPrefix.trim();
    this.config.globalSuffix = this.config.globalSuffix || defaultGlobalSuffix.trim();
    this.config.groupPrefix = this.config.groupPrefix || defaultGroupPrefix.trim();
    this.config.groupSuffix = this.config.groupSuffix || defaultGroupSuffix.trim();

    this.snippets = [
      this.config.d1,
      this.config.d2,
      this.config.d3,
      this.config.d4,
    ];

    this.config.travelHeight = 1;
  }

  withImage(image) {
    Promise.all([
      image.getMeta(),
      image.getPalette(),
      image.getCanvas(getCanvasOpts),
    ])
      .then(([meta, { palette }, canvas]) => {
        if (!meta.isRGBN) {
          this.handleMonochrome({ canvas, palette, meta });
        }
      });
  }

  gCodeStep({ x, y, code }) {
    return code
      .replace(/\{x}/g, x)
      .replace(/\{y}/g, y)
      .split('\n');
  }

  getColorIndex(context, x, y) {
    const { data: [r, g, b] } = context.getImageData(x, y, 1, 1);
    const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return lookupPalette.indexOf(colorHex);
  }

  getGroups({ context, width, height }) {
    const groups = [[], [], [], []];

    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        const ci = this.getColorIndex(context, x, y);

        if (this.snippets[ci]) {
          groups[ci].push(this.gCodeStep({ x, y: height - y, code: this.snippets[ci] }));
        }
      }
    }

    return groups.map((group) => ([
      ...this.config.groupPrefix.split('\n'),
      ...group,
      ...this.config.groupSuffix.split('\n'),
    ]));
  }

  renderCode(groups) {
    const code = this.config.globalPrefix.split('\n');
    code.push(groups);
    code.push(...this.config.globalSuffix.split('\n'));
    return code;
  }

  cwh(canvas) {
    if (!canvas) {
      return {};
    }

    return {
      context: canvas.getContext('2d'),
      width: canvas.width,
      height: canvas.height,
    };
  }

  handleMonochrome({ canvas, meta }) {
    // const { context, width, height } = this.cwh(canvas);
    const { context } = this.cwh(canvas);
    const width = 32;
    const height = 32;

    const groups = this.getGroups({ context, width, height });
    const code = this.renderCode(groups);

    // const code = JSON.stringify({
    //   snippets: this.snippets,
    //   groups,
    // }, null, 2);

    const lines = code
      .flat(Infinity)
      .map((line) => line.split('#')[0].trim())
      .filter(Boolean);

    console.log(lines);

    this.saveAs(new Blob([lines.join('\n')]), `gcode.${meta.title ? `${meta.title}.` : ''}nc`);
  }

  withSelection() {}
}

window.gbpwRegisterPlugin(Gcode);
