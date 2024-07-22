class DummyPlugin {
  constructor({ saveAs, progress, store: { dispatch } }, config) {
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
    // progress should be called with values between 0 and 1 to indicate plugin progress
    // both values should be stored as follows:
    this.saveAs = saveAs;
    this.progress = progress;
    this.dispatch = dispatch;
    this.mainCanvas = null;
    this.mainCanvasCtx = null;
  }

  showMessage(label) {
    this.dispatch({
      type: 'CONFIRM_ASK',
      payload: {
        message: this.name,
        questions: () => [
          {
            label,
            key: 'info',
            type: 'info',
          },
        ],
        confirm: () => {
          this.dispatch({
            type: 'CONFIRM_ANSWERED',
          });
        },
      },
    });
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
    this.showMessage(`${this.name} is needs to be run over a set of images`);
  }

  async withSelection(images) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    const lightboxBox = document.createElement('div');
    lightboxBox.classList.add('lightbox__box');
    const lightboxClose = document.createElement('button');
    lightboxClose.classList.add('lightbox__backdrop');
    const lightboxBoxContent = document.createElement('div');
    lightboxBoxContent.classList.add('lightbox__box-content');
    const lightboxBoxButtons = document.createElement('div');
    lightboxBoxButtons.classList.add('buttons');
    const lightboxBoxSaveButton = document.createElement('button');
    lightboxBoxSaveButton.classList.add('buttons__button--confirm');
    lightboxBoxSaveButton.classList.add('buttons__button');
    lightboxBoxSaveButton.textContent = 'Download';
    const lightboxBoxDenyButton = document.createElement('button');
    lightboxBoxDenyButton.classList.add('buttons__button--deny');
    lightboxBoxDenyButton.classList.add('buttons__button');
    lightboxBoxDenyButton.textContent = 'Cancel';

    lightboxBoxContent.style.height = '430px';
    lightboxBoxContent.style.padding = '20px';

    document.body.appendChild(lightbox);
    lightbox.appendChild(lightboxBox);
    lightbox.appendChild(lightboxClose);
    lightboxBox.appendChild(lightboxBoxContent);
    lightboxBox.appendChild(lightboxBoxButtons);
    lightboxBoxButtons.appendChild(lightboxBoxDenyButton);
    lightboxBoxButtons.appendChild(lightboxBoxSaveButton);

    lightboxClose.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });

    lightboxBoxSaveButton.addEventListener('click', () => {
      this.mainCanvas.toBlob(async (blob) => {
        const now = new Date();
        const datetime = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);

        await this.saveAs(blob, `${datetime}-average.${this.config.fileExtension}`);
        document.body.removeChild(lightbox);
      }, this.config.mimeType);
    });

    lightboxBoxDenyButton.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });

    const canvases = await Promise.all(images.map((image) => (
      image.getCanvas({
        scaleFactor: this.config.scaleFactor || 4,
      })
    )));

    canvases.forEach((canvas, index) => {
      if (index === 0) {
        this.mainCanvas = canvas;
        this.mainCanvasCtx = this.mainCanvas.getContext('2d');
        lightboxBoxContent.appendChild(this.mainCanvas);
        this.mainCanvas.style.display = 'block';
        this.mainCanvas.style.width = '100%';
        this.mainCanvas.style.maxWidth = '440px';
        this.mainCanvas.style.margin = '0 auto';
      } else {
        this.mainCanvasCtx.globalAlpha = 1 / (index + 1);
        this.mainCanvasCtx.drawImage(canvas, 0, 0);
      }
    });
  }
}

window.gbpwRegisterPlugin(DummyPlugin);
