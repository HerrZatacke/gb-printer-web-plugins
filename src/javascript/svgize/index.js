class SVGIze {
  constructor(env, config) {
    this.name = 'SVG-ize';
    this.description = 'Creates an svg from your image';
    this.configParams = {};

    this.config = config;
    this.saveAs = env.saveAs;
    this.progress = env.progress;
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);
  }

  withImage(image) {
    Promise.all([
      image.getPalette(),
      image.getCanvas({
        handleExportFrame: 'crop',
      }),
    ])
      .then(([{ palette }, canvas]) => {
        document.body.appendChild(canvas);

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
          0.15,
          0.25,
          0.35,
          0.45,
        ];

        for (let x = 0; x < width; x += 1) {
          for (let y = 0; y < height; y += 1) {
            const ci = getColorIndex(x, y, 1, 1);

            if (radii[ci]) {
              doc.push(`<circle cx="${x + 0.5}" cy="${y + 0.5}" r="${radii[ci]}" fill="#000"/>`);
            }
          }
        }

        doc.push('</svg>');

        this.saveAs(new Blob([doc.join('\n')]), 'yay.svg');
      });
  }

  withSelection() {}
}

window.gbpwRegisterPlugin(SVGIze);
