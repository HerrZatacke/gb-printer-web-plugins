const red = '#ff0000';
const green = '#00ff00';
const blue = '#0000ff';
const neut = '#000000';

const lookupPalette = [
  '#000000',
  '#ff0000',
  '#00ff00',
  '#0000ff',
];

const rgbn = [
  ['#000000', '#550000', '#aa0000', '#ff0000'],
  ['#000000', '#005500', '#00aa00', '#00ff00'],
  ['#000000', '#000055', '#0000aa', '#0000ff'],
  ['#000000', '#555555', '#aaaaaa', '#ffffff'],
];

const getCanvasOpts = {
  handleExportFrame: 'crop',
  palette: {
    palette: lookupPalette,
  },
};

class SVGIze {
  constructor(env, config) {
    this.name = 'SVG-ize';
    this.description = 'Creates an svg from your image';
    this.configParams = {
      r1: {
        label: 'Radius 1 (smallest)',
        type: 'number',
      },
      r2: {
        label: 'Radius 2',
        type: 'number',
      },
      r3: {
        label: 'Radius 3',
        type: 'number',
      },
      r4: {
        label: 'Radius 4 (biggest)',
        type: 'number',
      },
    };

    this.config = {};
    this.radii = [];
    this.saveAs = env.saveAs;
    this.progress = env.progress;
    this.collectImageData = env.collectImageData;
    this.setConfig(config);
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);
    this.config.r1 = parseFloat(this.config.r1) || 0;
    this.config.r2 = parseFloat(this.config.r2) || 0;
    this.config.r3 = parseFloat(this.config.r3) || 0;
    this.config.r4 = parseFloat(this.config.r4) || 0;

    this.radii = [
      this.config.r1,
      this.config.r2,
      this.config.r3,
      this.config.r4,
    ];
  }

  withImage(image) {
    Promise.all([
      image.getMeta(),
      image.getPalette(),
      image.getCanvas(getCanvasOpts),
    ])
      .then(([meta, { palette }, canvas]) => {

        if (meta.isRGBN) {
          this.handleRGBN({ hashes: meta.hashes, palette, meta });
        } else {
          this.handleMonochrome({ canvas, palette, meta });
        }
      });
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

        const xOffset = y % 2 ? 0.5 : 0;

        if (this.radii[ci]) {
          groups[ci].push(`<circle cx="${x + 0.5 + xOffset}" cy="${y + 0.5}" r="${this.radii[ci]}" />`);
        }
      }
    }

    return groups;
  }

  renderSVG({ groups, width, height }) {
    const svgDocument = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`,
      `<rect x="0" y="0" width="${width}" height="${height}" fill="#fff"/>`,
    ];

    svgDocument.push(groups);
    svgDocument.push('</svg>');

    return svgDocument;
  }

  combineGroups(groups, palette) {
    return groups.map((g, index) => (
      [
        `<g fill="${palette[index]}">`,
        ...g,
        '</g>',
      ]
        .join('\n')
    ))
      .filter((g) => g.length > 2);
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

  handleMonochrome({ canvas, palette, meta }) {
    const { context, width, height } = this.cwh(canvas);
    const groups = this.combineGroups(this.getGroups({ context, width, height }), palette);
    const svg = this.renderSVG({ groups, width, height });
    this.saveAs(new Blob([svg.join('\n')]), `SVGize.${meta.title ? `${meta.title}.` : ''}svg`);
  }

  handleChannel(channelCanvas) {
    if (!channelCanvas) {
      return {};
    }

    const { context, width, height } = this.cwh(channelCanvas);
    const groups = this.getGroups({ context, width, height });
    // const svg = this.renderSVG({ groups, width, height, palette });

    return {
      groups,
      width,
      height,
    };
  }

  handleRGBN({ hashes, meta }) {
    Promise.all([
      hashes.r ? this.collectImageData(hashes.r).getCanvas(getCanvasOpts) : null,
      hashes.g ? this.collectImageData(hashes.g).getCanvas(getCanvasOpts) : null,
      hashes.b ? this.collectImageData(hashes.b).getCanvas(getCanvasOpts) : null,
      hashes.n ? this.collectImageData(hashes.n).getCanvas(getCanvasOpts) : null,
    ])
      .then(([r, g, b, n]) => {
        const channels = [
          this.handleChannel(r),
          this.handleChannel(g),
          this.handleChannel(b),
          this.handleChannel(n),
        ];

        const width = Math.max(...channels.map((channel) => channel.width));
        const height = Math.max(...channels.map((channel) => channel.height));
        const groups = channels.map((channel, index) => (
          this.combineGroups(channel.groups, rgbn[index])
        ));

        const svg = this.renderSVG({ groups, width, height, palette: [red, green, blue, neut] });

        this.saveAs(new Blob([svg.join('\n')]), `SVGize.${meta.title ? `${meta.title}.` : ''}svg`);
      });
  }

  withSelection() {}
}

window.gbpwRegisterPlugin(SVGIze);
