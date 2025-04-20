const defaultPalette = {
  r: [0, 85, 170, 255],
  g: [0, 85, 170, 255],
  b: [0, 85, 170, 255],
  n: [0, 85, 170, 255],
  blend: 'multiply',
};

class RGB {
  constructor(env, config) {
    this.name = 'Random Generated Bunch';
    this.description = 'Generate a bunch of RGB images from current selection';
    this.configParams = {
      combinations: {
        label: 'Number of RGB-combinations',
        type: 'number',
      },
    };

    // will be updated via setConfig()
    this.config = {};
    this.setConfig(config);

    this.showMessage = (text) => env.functions.alert(this.name, text);
    this.addImages = env.functions.addImages;
    this.progress = env.progress;
  }

  setConfig(configUpdate) {
    // custom config update code
    Object.assign(this.config, configUpdate);
  }

  createImage(index, hashes, created, tags) {
    const hash = Array(40)
      .fill('')
      .map((_, idx) => (
        // eslint-disable-next-line no-bitwise
        (parseInt(hashes.r.slice(idx, idx + 1), 16) % 16) ^
        // eslint-disable-next-line no-bitwise
        (parseInt(hashes.g.slice(idx, idx + 1), 16) % 16) ^
        // eslint-disable-next-line no-bitwise
        (parseInt(hashes.b.slice(idx, idx + 1), 16) % 16)
      )
        .toString(16))
      .join('');

    return {
      palette: defaultPalette,
      hashes,
      title: `Random Generated Bunch ${index.toString(10).padStart(4, '0')}`,
      tags: [...tags, 'RaGeBu'],
      created,
      hash,
    };
  }

  pickOne(images) {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }

  async withSelection(images) {
    this.progress(0.1);
    const bwImages = (await Promise.all(images.map(({ getMeta }) => getMeta())))
      .filter(({ isRGBN }) => !isRGBN);

    this.progress(0.2);

    if (bwImages.length < 3) {
      this.showMessage('This plugin requires some more monochrome images to run');
      this.progress(0);
      return;
    }

    this.progress(0.3);

    const toAdd = Array(this.config.combinations)
      .fill('')
      .map((_, index) => {
        const red = this.pickOne(bwImages);
        return this.createImage(index, {
          r: red.hash,
          g: this.pickOne(bwImages).hash,
          b: this.pickOne(bwImages).hash,
        }, red.created, red.tags);
      });

    this.progress(0.4);

    this.addImages(toAdd);

    this.progress(0.5);

    window.setTimeout(() => {
      this.showMessage('Done!');
      this.progress(0);
    }, 200);
  }

  withImage() {
    this.showMessage('This plugin runs on a image selection');
    this.progress(0);
  }
}

window.gbpwRegisterPlugin(RGB);
