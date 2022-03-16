import removeFrame from './removeFrame';
import binarizeTile from './binarizeTile';
import blobArrayBuffer from './blobArrayBuffer';
import baseRam from './base-ram.sav';

class PluginSkeleton {
  constructor(env, config) {
    this.name = 'To .sav';
    this.description = 'This plugin creates a .sav file with a maximum of 30 images';
    this.configParams = {};
    this.config = {};
    this.setConfig(config);
    this.saveAs = env.saveAs;
    this.progress = env.progress;
    this.dispatch = env.store.dispatch;
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);
  }

  withImage(image) {
    this.withSelection([image]);
  }

  withSelection(images) {
    Promise.all(images.map(({ getMeta, getTiles }) => (
      Promise.all([getMeta(), getTiles()])
        .then(([meta, tiles]) => ({ meta, tiles }))
    )))
      .then((imageData) => (
        imageData
          .filter(({ meta: { isRGBN }, tiles }) => (
            !isRGBN &&
            tiles.length === 360
          ))
          .map(({ meta: { frame }, tiles }) => ({
            tiles: tiles.filter(removeFrame),
            frame,
          }))
      ))
      .then((usableImages) => (
        usableImages.map(({ tiles: tileString, frame }) => {
          const indexRe = /^[a-zA-Z]+(?<index>[0-9]+)$/gi;
          const frameIndex = parseInt(indexRe.exec(frame)?.groups?.index || '1', 10) - 1;

          return {
            frameIndex,
            tiles: new Uint8Array(tileString.map(binarizeTile).flat()),
          };
        })
      ))
      .then((imageData) => (
        fetch(baseRam)
          .then((res) => res.blob())
          .then(blobArrayBuffer)
          .then((baseRamArray) => ({
            imageData,
            baseRamArray: new Uint8Array(baseRamArray),
          }))
      ))
      .then(({ baseRamArray, imageData }) => {

        imageData.forEach(({ tiles, frameIndex }, index) => {
          if (tiles.length !== 0xe00 || index >= 30) {
            return;
          }

          const baseAddress = (index + 2) * 0x1000;
          baseRamArray.set(tiles, baseAddress);

          baseRamArray.set([frameIndex], baseAddress + 0xfb0);
        });

        return baseRamArray;
      })
      .then((result) => {
        this.saveAs(new Blob([result]), 'thingy.sav');
      });
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
}

window.gbpwRegisterPlugin(PluginSkeleton);
