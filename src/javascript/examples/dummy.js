import sampleImage from '../../assets/images/sample.png';

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
    this.saveAs = () => null;
    this.progress = () => null;

    // the env object env contains a reference to the redux-store.
    // if you need it, be careful what you do with it and if possible learn the basic concepts of redux https://redux.js.org/understanding/thinking-in-redux/motivation
    console.log(env, this.config);
  }

  init({ saveAs, progress }) {
    // saveAs is a reference to the saveAs method from https://www.npmjs.com/package/file-saver
    // progress should be called with values between 0 and 1 to indicate plugin progress
    // both values should be stored as follows:
    this.saveAs = saveAs;
    this.progress = progress;

    // this is a way to import (small) binary assets into your js
    // the value can be handled as any URL
    console.log(sampleImage);

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
