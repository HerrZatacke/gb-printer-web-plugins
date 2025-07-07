/*!
 * Custom Pixels Plugin
 *
 * This plugin is a plain JS implementation of the original GameboyPrinterPaperSimulation by Raphaël Boichot
 * https://github.com/Raphael-Boichot/GameboyPrinterPaperSimulation
 *
 * It can be added to the Gameboy Printer Web App
 * https://herrzatacke.github.io/gb-printer-web/#/settings/plugins
 *
 */

class CustomPixelsPlugin {
  constructor({ saveAs, setError, progress, functions: { alert } }, config) {
    this.name = 'Custom Pixels Plugin';
    this.description = 'Render one of your images with pixels taken from en external image source';
    this.configParams = {
      imageUrl: {
        label: 'External URL of the image file containing custom pixels',
        type: 'string',
      },
      pixelSize: {
        label: 'Side length of a pixel',
        type: 'number',
      },
      outputScale: {
        label: 'Scale output image (in %)',
        type: 'number',
      },
      exportAs: {
        label: 'Export filetype',
        type: 'string',
      },
      streakIntensity: {
        label: 'Intensity of streaks (0-100)',
        type: 'number',
      },
      flipRotate: {
        label: 'Flip and rotate sample pixels (set to !=0 to activate)',
        type: 'number',
      },
      colorMix: {
        label: 'Use the image\'s palette to colorize the pixels. (allowed values from "ctx.globalCompositeOperation")',
        type: 'string',
      },
    };

    this.canRun = false;
    this.config = {};
    this.samples = null;
    this.pixelTransitions = null;
    this.saveAs = saveAs;
    this.setError = setError;
    this.progress = progress;
    this.showMessage = (text) => alert(this.name, text);
    this.setConfig(config);
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);

    this.samples = null;
    this.pixelTransitions = null;

    const {
      imageUrl,
      pixelSize,
      outputScale,
      exportAs,
      streakIntensity,
    } = this.config;

    this.canRun = (
      Boolean(imageUrl) &&
      Boolean(pixelSize) &&
      Boolean(outputScale)
    );

    this.config.exportAs = exportAs || 'jpg';
    this.config.streakIntensity = streakIntensity || 0;
  }

  setPixelTransitions() {
    const ps = this.config.pixelSize;
    if (ps && this.config.flipRotate) {
      this.pixelTransitions = [
        [1, 0, 0, 1, 0, 0],
        [0, 1, -1, 0, ps, 0],
        [-1, 0, 0, -1, ps, ps],
        [0, -1, 1, 0, 0, ps],
        [-1, 0, 0, 1, ps, 0],
        [0, -1, -1, 0, ps, ps],
        [1, 0, 0, -1, 0, ps],
        [0, 1, 1, 0, 0, 0],
      ];
    } else {
      this.pixelTransitions = [
        [1, 0, 0, 1, 0, 0],
      ];
    }
  }

  loadImage() {
    if (this.samples) {
      return Promise.resolve();
    }

    const image = new Image();
    image.crossOrigin = 'Anonymous';

    return new Promise((resolve, reject) => {
      image.addEventListener('load', () => {
        const sampleCount = Math.floor(image.naturalWidth / this.config.pixelSize);

        this.samples = Array.from({ length: 4 }, (_, sampleY) => {
          const samples = Array.from({ length: sampleCount }, (__, sampleX) => (
            this.pixelTransitions.map((matrix) => () => (
              this.generateSample({
                image,
                sampleY,
                sampleX,
                matrix,
              })))
          )).flat();

          const wantSamples = sampleCount * this.pixelTransitions.length;
          const gotSamples = samples.filter(Boolean).length;
          if (wantSamples !== gotSamples) {
            this.setError(new Error(`could not generate required samples of pixels: Expected ${wantSamples}, got ${gotSamples}`));
            return null;
          }

          return samples;
        });


        resolve();
      });


      image.addEventListener('error', () => {
        this.setError(new Error('Could not load pixels source image'));
        reject();
      });

      image.src = this.config.imageUrl;
    });
  }

  generateSample({ image, sampleX, sampleY, matrix }) {
    const pixelSize = this.config.pixelSize;
    const canvas = document.createElement('canvas');
    canvas.width = this.config.pixelSize;
    canvas.height = this.config.pixelSize;
    const context = canvas.getContext('2d');

    context.setTransform(...matrix);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      image,
      sampleX * pixelSize,
      sampleY * pixelSize,
      pixelSize,
      pixelSize,
      0,
      0,
      pixelSize,
      pixelSize,
    );

    return context.getImageData(0, 0, pixelSize, pixelSize);
  }

  withImage(image) {
    if (!this.canRun) {
      this.showMessage(`${this.name} is missing config settings`);
      this.progress(0);
      return;
    }

    this.setPixelTransitions();

    Promise.all([
      image.getMeta(),
      image.getPalette(),
      image.getCanvas({ lockFrame: false }),
      this.loadImage(),
    ]).then(([meta, { palette }, sourceCanvas]) => {
      const sourcePalette = palette.map((v) => v.toLowerCase());

      if (!this.samples || !this.samples.length || !this.samples[0].length) {
        this.setError(new Error('No samples to set pixel'));
        this.progress(0);
        return;
      }

      if (meta.isRGBN) {
        this.setError(new Error(`${this.name} does not work with RGBN images`));
        this.progress(0);
        return;
      }

      const sourceContext = sourceCanvas.getContext('2d');
      const pxHeight = sourceCanvas.height * this.config.pixelSize;
      const pxWidth = sourceCanvas.width * this.config.pixelSize;

      const targetCanvas = document.createElement('canvas');
      targetCanvas.width = pxWidth;
      targetCanvas.height = pxHeight;

      const targetContext = targetCanvas.getContext('2d');
      targetContext.fillStyle = '#ffffff';
      targetContext.fillRect(0, 0, targetCanvas.width, targetCanvas.height);

      const streaks = this.generateStreaks(sourceCanvas.width, sourceCanvas.height);

      const setPixelInContext = this.setPixel({
        sourceContext,
        sourcePalette,
        targetContext,
        streaks,
      });

      const setNextPx = (x) => {

        // render one image column
        for (let y = 0; y < sourceCanvas.height; y += 1) {
          const success = setPixelInContext(x, y);
          if (!success) {
            this.progress(0);
            return;
          }
        }

        const nextX = (x + 1) % sourceCanvas.width;

        // Not done yet
        if (nextX) {
          window.setTimeout(() => {
            this.progress(x / sourceCanvas.width);
            setNextPx(nextX);
          }, 0);
          return;
        }

        this.saveImage(targetCanvas, meta);
      };

      setNextPx(0);
    });
  }

  setPixel({
    sourceContext,
    sourcePalette,
    targetContext,
    streaks,
  }) {
    return (x, y) => {
      const color = sourceContext.getImageData(x, y, 1, 1);
      const hex = `#${
        [...color.data.slice(0, 3)]
          .map((val) => val.toString(16).padStart(2, '0'))
          .join('')
      }`;

      const rowIndex = 3 - sourcePalette.findIndex((palColor) => (
        palColor.toLowerCase() === hex.toLowerCase()
      ));

      const sampleType = this.samples[rowIndex];

      if (!sampleType) {
        this.setError(new Error(`No sample matching palette color ${rowIndex} - ${JSON.stringify(sourcePalette)} - ${hex}`));
        return false;
      }

      const randomIndex = Math.floor(Math.random() * sampleType.length);
      let pixel = sampleType?.[randomIndex] || sampleType[0];

      if (typeof pixel === 'function') {
        pixel = pixel();
        sampleType[randomIndex] = pixel;
      }

      if (this.config.streakIntensity) {
        const intensity = Math.min(255, Math.max(0, 255 - (this.config.streakIntensity * 2.55)));
        const brightness = streaks[x][y] ? intensity : 255;
        for (let i = 3; i < pixel.data.length; i += 4) {
          pixel.data[i] = brightness;
        }
      }

      targetContext.putImageData(pixel, x * this.config.pixelSize, y * this.config.pixelSize);

      if (this.config.colorMix) {
        /* eslint-disable no-param-reassign */
        targetContext.globalCompositeOperation = this.config.colorMix;
        targetContext.fillStyle = hex;
        targetContext.fillRect(
          x * this.config.pixelSize,
          y * this.config.pixelSize,
          (x + 1) * this.config.pixelSize,
          (y + 1) * this.config.pixelSize,
        );
        /* eslint-enable no-param-reassign */
      }

      return true;
    };
  }

  generateStreaks(width, height) {
    // create 2d array
    const grid = [...Array(width)].fill(0).map(() => ([...Array(height)].fill(false)));

    const maxLen = 20;

    for (let x = 0; x < width; x += 1) {
      for (let y = -maxLen; y < height + maxLen; y += 1) {
        if (Math.random() < 0.125) {
          for (let streakY = y; streakY < y + (Math.random() * maxLen); streakY += 1) {
            try {
              grid[x][streakY] = true;
            } catch (error) { /* noop */ }
          }
        }
      }
    }

    return grid;
  }

  saveImage(targetCanvas, meta) {
    const exportParams = this.config.exportAs === 'png' ? ['image/png'] : ['image/jpeg', 0.8];
    const exportExtension = this.config.exportAs === 'png' ? 'png' : 'jpg';
    const saveCanvas = document.createElement('canvas');
    saveCanvas.width = Math.floor(targetCanvas.width * (this.config.outputScale / 100));
    saveCanvas.height = Math.floor(targetCanvas.height * (this.config.outputScale / 100));

    const saveContext = saveCanvas.getContext('2d');
    saveContext.fillStyle = '#ffffff';
    saveContext.fillRect(0, 0, saveCanvas.width, saveCanvas.height);

    const img = new Image();
    img.addEventListener('load', () => {
      saveContext.drawImage(img, 0, 0, saveCanvas.width, saveCanvas.height);

      saveCanvas.toBlob((finalBlob) => {
        this.saveAs(finalBlob, `CustomPixels.${meta.title ? `${meta.title}.` : ''}${exportExtension}`);

        // close overlay
        this.progress(0);
      }, ...exportParams);
    });
    img.src = targetCanvas.toDataURL('image/png');
  }

  withSelection() {
    this.setError(new Error(`${this.name} does not handle multiple images at once.`));
  }
}

window.gbpwRegisterPlugin(CustomPixelsPlugin);
