class PluginSkeleton {
  constructor(env, config) {
    this.name = 'Plugin Skeleton'; // Use a good name here
    this.description = 'This plugin exposes all necessary methods and properties'; // Add a small description of your plugin
    this.configParams = {}; // See dummy.js on how to define config params
    this.config = config;
    this.saveAs = () => null;
    this.progress = () => null;
  }

  init({ saveAs, progress }) {
    this.saveAs = saveAs;
    this.progress = progress;
  }

  setConfig(configUpdate) {
    Object.assign(this.config, configUpdate);
  }

  withImage(image) {
  }

  withSelection(images) {
  }
}

window.gbpwRegisterPlugin(PluginSkeleton);