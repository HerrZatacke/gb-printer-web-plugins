class DummyPlugin {
  constructor(env, config) {
    this.name = 'Stitch';
    this.description = 'This plugin stitches separate images while removing appropriate top/bottom frames';
    this.setConfig(config);
    this.dispatch = env.store.dispatch;
  }

  setConfig(/* config */) {}

  withImage() {}

  async withSelection(images) {
    const { title } = await images[0].getMeta();
    const imageTiles = await Promise.all(images.map((image) => image.getTiles()));
    const unframedImages = imageTiles.map((tiles, index) => {
      switch (index) {
        case 0:
          return tiles.slice(0, -40);
        case imageTiles.length - 1:
          return tiles.slice(40);
        default:
          return tiles.slice(40, -40);
      }
    });

    const fileContent = [
      ...unframedImages.flat(1),
      '{"command":"PRNT","sheets":1,"margin_upper":1,"margin_lower":3,"pallet":228,"density":64 }',
    ].join('\n');

    let file;
    try {
      file = new File([...fileContent], `Stitched "${title}"`, { type: 'text/plain' });
    } catch (error) {
      file = new Blob([...fileContent], { type: 'text/plain' });
    }

    this.dispatch({
      type: 'IMPORT_FILES',
      payload: { files: [file] },
    });
  }
}

window.gbpwRegisterPlugin(DummyPlugin);
