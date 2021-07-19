class DummyPlugin {
  constructor(env, config) {
    this.name = 'Dummy Plugin';
    this.description = 'This is a dummy plugin which just \'console.log\'s some stuff';
    this.configParams = {
      message: {
        label: 'A message',
        type: 'string',
      },
      amount: {
        label: 'A number',
        type: 'number',
      },
    };

    this.config = config;
    console.log(env, this.config);
  }

  init() {
    // custom init code
  }

  setConfig(configUpdate) {
    // custom config update code
    Object.assign(this.config, configUpdate);
    console.log(this.config);
  }

  withImage(image) {
    // get basic metadata
    image.getMeta().then((meta) => console.log(meta));

    // get the palette
    image.getPalette().then((palette) => console.log(palette));

    // get the tiles as array of strings
    image.getTiles().then((tiles) => console.log(tiles));

    // get canvas
    image.getCanvas().then((canvas) => console.log(canvas));
  }

  withSelection(images) {
    console.log(images);
  }
}

window.gbpwRegisterPlugin(DummyPlugin);
