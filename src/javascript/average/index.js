class AveragePlugin {
  constructor({ saveAs, functions: { alert, setDialog, dismissDialog } }, config) {
    this.name = 'Average';
    this.description = 'Create an average over a set of images';
    this.configParams = {
      scaleFactor: {
        label: 'Image export dimension factor (1x, 2x, ...)',
        type: 'number',
      },
      fileExtension: {
        label: 'Filetype: Use "png", "jpg" or "webp"',
        type: 'string',
      },
    };

    // will be updated via setConfig()
    this.config = {};
    this.setConfig(config);

    // saveAs is a reference to the saveAs method from https://www.npmjs.com/package/file-saver
    this.saveAs = saveAs;
    this.showMessage = (text) => alert(this.name, text);
    this.setDialog = setDialog;
    this.dismissDialog = dismissDialog;
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);

    switch (configUpdate.fileExtension?.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        this.config.fileExtension = 'jpg';
        this.config.mimeType = 'image/jpeg';
        break;
      case 'webp':
        this.config.fileExtension = 'webp';
        this.config.mimeType = 'image/webp';
        break;
      case 'png':
      default:
        this.config.fileExtension = 'png';
        this.config.mimeType = 'png';
        break;
    }

  }

  withImage() {
    this.showMessage(`${this.name} needs to be run with a set of images`);
  }

  async withSelection(images) {
    const canvases = await Promise.all(images.map((image) => (
      image.getCanvas({
        scaleFactor: this.config.scaleFactor || 4,
      })
    )));

    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = canvases[0].width;
    mainCanvas.height = canvases[0].height;
    mainCanvas.style.display = 'block';
    mainCanvas.style.width = '100%';
    mainCanvas.style.maxWidth = '440px';
    mainCanvas.style.margin = '0 auto';
    const mainCanvasCtx = mainCanvas.getContext('2d');

    canvases.forEach((canvas, index) => {
      mainCanvasCtx.globalAlpha = 1 / (index + 1);
      mainCanvasCtx.drawImage(canvas, 0, 0);
    });

    const src = mainCanvas.toDataURL(this.config.mimeType);

    this.setDialog({
      message: `Averaged ${canvases.length} images:`,
      questions: () => ([
        {
          label: 'Averaged result',
          key: 'image',
          type: 'image',
          src,
        },
        {
          label: `Click "Ok" to download ${this.config.mimeType}`,
          key: 'info',
          type: 'info',
        },
      ]),
      confirm: async () => {
        mainCanvas.toBlob(async (blob) => {
          const now = new Date();
          const datetime = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);

          await this.saveAs(blob, `${datetime}-average.${this.config.fileExtension}`);
          this.dismissDialog(0);
        }, this.config.mimeType);
      },
      deny: async () => this.dismissDialog(0),
    });
  }
}

window.gbpwRegisterPlugin(AveragePlugin);
