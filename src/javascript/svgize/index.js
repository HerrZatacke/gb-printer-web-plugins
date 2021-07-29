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
    this.saveAs = env.saveAs;
    this.progress = env.progress;
    this.setConfig(config);
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);
    this.config.r1 = parseFloat(this.config.r1) || 0;
    this.config.r2 = parseFloat(this.config.r2) || 0;
    this.config.r3 = parseFloat(this.config.r3) || 0;
    this.config.r4 = parseFloat(this.config.r4) || 0;
  }

  withImage(image) {
    Promise.all([
      image.getMeta(),
      image.getPalette(),
      image.getCanvas({
        handleExportFrame: 'crop',
      }),
    ])
      .then(([meta, { palette }, canvas]) => {
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const getColorIndex = (x, y) => {
          const { data: [r, g, b] } = context.getImageData(x, y, 1, 1);
          const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
          return palette.indexOf(colorHex);
        };

        const doc = [
          `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`,
        ];

        const radii = [
          this.config.r1,
          this.config.r2,
          this.config.r3,
          this.config.r4,
        ];

        const groups = [[], [], [], []];

        for (let x = 0; x < width; x += 1) {
          for (let y = 0; y < height; y += 1) {
            const ci = getColorIndex(x, y, 1, 1);

            const xOffset = y % 2 ? 0.5 : 0;

            if (radii[ci]) {
              groups[ci].push(`<circle cx="${x + 0.5 + xOffset}" cy="${y + 0.5}" r="${radii[ci]}" />`);
            }
          }
        }

        doc.push(
          groups
            .map((g, index) => (
              [
                `<g fill="${palette[index]}">`,
                ...g,
                '</g>',
              ]
                .join('\n')
            ))
            .filter((g) => g.length > 2),
        );

        doc.push('</svg>');

        this.saveAs(new Blob([doc.join('\n')]), `SVGize.${meta.title ? `${meta.title}.` : ''}svg`);
      });
  }

  withSelection() {}
}

window.gbpwRegisterPlugin(SVGIze);
