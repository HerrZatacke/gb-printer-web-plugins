const hexify = (tileIndex) => (
  `0x${tileIndex.toString(16).padStart(2, '0')}`
);

class PluginSkeleton {
  constructor(env, config) {
    this.name = 'GBDK Tiles';
    this.description = 'This plugin creates tiles for the gbdk';
    this.configParams = {};
    this.config = {};
    this.setConfig(config);
    this.saveAs = env.saveAs;
    this.progress = env.progress;
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);
  }

  withImage(image) {

    image.getMeta().then((meta) => {
      const frameName = `frame_${meta.frame}`;

      image.getTiles().then((tiles) => {
        const tilesUpper = tiles.map((tile) => tile.toLocaleUpperCase());

        const tileData = [];
        const tileMap = tilesUpper.map((tile) => {
          let tileIndex = tileData.findIndex((savedTile) => savedTile === tile);
          if (tileIndex < 0) {
            tileIndex = tileData.length;
          }

          tileData[tileIndex] = tile;
          return tileIndex;
        });

        const cTileMapContent = tileMap.map(hexify).join(', ');

        const cTileDataContent = tileData.map((tile) => (
          [...Array(Math.ceil(tile.length / 2))]
            .map((_, i) => tile.slice(i * 2, (i * 2) + 2))
            .map(hexify)
            .join(', ')
        ))
          .join(',\n');

        const fileContent = new Blob([`// TileCount
#define ${frameName}_TILE_COUNT ${tileData.length}

// Tiles
const unsigned char ${frameName}_tiles[${tileData.length * 16}] = {
${cTileDataContent}
};

// Map
const unsigned char ${frameName}_map[${tileMap.length}] = {
${cTileMapContent}
};
`], { type: 'text/plain;charset=utf-8' });

        this.saveAs(fileContent, `${frameName}.h`);
      });

    });

  }
}

window.gbpwRegisterPlugin(PluginSkeleton);
