import { Howl } from 'howler';
import { Loader, Texture, Spritesheet } from 'pixi.js';
import config from '../config';

const context = require.context('../assets', true, /\.(jpg|png|wav|m4a|ogg|mp3)$/im);

const IMG_EXTENSIONS = ['jpeg', 'jpg', 'png'];
const SOUND_EXTENSIONS = ['wav', 'ogg', 'm4a', 'mp3'];

/**
 * Global asset manager to help streamline asset usage in your game.
 * Automatically scans and stores a manifest of all available assets, so that they could
 * be loaded at any time
 *
 */
class AssetManager {
  constructor() {
    this.renderer = null;

    this._assets = {};
    this._sounds = {};
    this._images = {};
    this._spritesheets = {};

    this._importAssets();
  }

  /**
   * The main method of the AssetManager, use this to load any desired assets
   *
   * ```js
   * AssetManager.load({
   *  images: {
   *    logo: Assets.images.logo,
   *    logoBack: Assets.images.logoBack,
   *  }
   * })
   * ```
   *
   * @type {Object} options.images id-url object map of the images to be loaded
   * @type {Object} options.sounds id-url object map of the sounds to be loaded
   * @type {Object} options.sounds id-url object map of the sounds to be loaded
   * @type {Function} progressCallback Progress callback function, called every time a single asset is loaded
   *
   * @return {Promise} Returns a promise that is resolved once all assets are loaded
   */
  load(assets = { images: this._images, sounds: this._sounds }, progressCallback = () => {}) {
    const { images, sounds } = assets;
    const assetTypesCount = Object.keys(assets).length;
    const imagesCount = images ? Object.keys(images).length : 0;
    const soundsCount = sounds ? Object.keys(sounds).length : 0;
    const loadPromises = [];
    let loadProgress = 0;

    const calcTotalProgress = (val) => {
      loadProgress += val / assetTypesCount;
      progressCallback(parseInt(loadProgress, 10));
    };

    if (imagesCount) {
      loadPromises.push(this.loadImages(images, () => calcTotalProgress(100 / imagesCount)));
    }

    if (soundsCount) {
      loadPromises.push(this.loadSounds(sounds, calcTotalProgress));
    }

    return Promise.all(loadPromises);
  }

  /**
     * Create a Loader instance and add the game assets to the queue
     *
     * @return {Promise} Resolved when the assets files are downloaded and parsed into texture objects
     */
  loadImages(images = {}, progressCallback = () => {}) {
    const loader = new Loader(config.root);
    app.loader.baseURL = "assets";


    for (const [img, url] of Object.entries(images)) {
      loader.add(img, url);
    }
    app.loader
    .add("sprite01", "1.png")
    .add("sprite02", "2.png")
    .add("sprite03", "arrow.png")
    .add("sprite04", "background.jpg")
    .add("sprite05", "key-default.png")
    .add("sprite06", "key-long.png")
    .add("sprite07", "logo.png")
    .add("sprite08", "ooo.png")
    .add("sprite09", "path-1.svg")
    .add("sprite10", "path-2.svg")
    .add("sprite11", "path-3.svg")
    .add("sprite12", "path-4.svg")
    .add("sprite13", "path-5.svg")
    .add("sprite14", "path-6.svg")
    .add("sprite15", "path-7.svg")
    .add("sprite16", "path-8.svg")
    .add("sprite17", "path-9.svg")
    .add("sprite18", "path-10.svg")
    .add("sprite19", "planet-1.png")
    .add("sprite20", "planet-2.png")
    .add("sprite21", "planet-3.png")
    .add("sprite22", "planet-4.png")
    .add("sprite23", "play-scene.png")
    .add("sprite24", "rocket.png")
    .add("sprite25", "rover.png")
    .add("sprite26", "rover-health-bar.png")
    .add("sprite27", "rover-shadow.png")
    .add("sprite28", "shield-active.png")
    .add("sprite29", "shield-inactive.png")
    .add("sprite30", "star.png")
    .add("sprite31", "wins.png");

    loader.onProgress.add(() => progressCallback(loader.progress));
    app.loader.onProgress(showProgress);
    app.loader.onComplete(doneLoading);
    app.loader.onError.add(reportError);

    app.loader.load();

    function showProgress(e){
        console.log(e.progress);
    }
    function reportError(e){
        console.log("Error: " + e.message);
    }
    function doneLoading(e){
        console.log("Done Loading!");
    }


    return new Promise(loader.load.bind(loader));
  }

  /**
     * Prerender our loaded textures, so that they don't need to be uploaded to the GPU the first time we use them.
     * Very helpful when we want to swap textures during an animation without the animation stuttering
     *
     * @return {Promise} Resolved when all queued uploads have completed
     */
  prepareImages(images = {}, renderer = this.renderer) {
    const prepare = renderer.plugins.prepare;

    for (const [img] of Object.entries(images)) {
      prepare.add(Texture.from(img));
    }

    return new Promise(prepare.upload.bind(prepare));
  }

  /**
     * Create a Howl instance for each sound asset and load it.
     *
     * @return {Promise} Resolved when the assets files are downloaded and parsed into Howl objects
     */
  loadSounds(sounds = {}, progressCallback = () => {}) {
    const soundPromises = [];

    for (const [id, url] of Object.entries(sounds)) {
      soundPromises.push(this._loadSound(id, url));
    }

    // currently howler doesn't support loading progress
    Promise.all(soundPromises).then(progressCallback(100));

    return soundPromises;
  }

  /**
   * Creates spritesheets for animations and other purposes
   * @param {<Array.{ image: String, data: Object }>} list 
   */
  prepareSpritesheets(list) {
    const promises = list.map((item) => {
      return new Promise((resolve) => {
        const sheet = new Spritesheet(Texture.from(item.texture), item.data);
        sheet.parse(() => {
          this._spritesheets[item.texture] = sheet;
          resolve(sheet);
        });
      });
    });
    
    return Promise.all(promises);
  }

  /**
   * Manifest of all available images
   */
  get images() {
    return this._images;
  }

  /**
   * Manifest of all available sounds
   */
  get sounds() {
    return this._sounds;
  }

  /**
   * Manifest of all available assets
   */
  get assets() {
    return this._assets;
  }

  /**
   * Manifest of all available spritesheets
   */
  get spritesheets() {
    return this._spritesheets;
  }

  _loadSound(id, url) {
    const sound = new Howl({ src: [url] });

    this._sounds[id] = sound;

    return new Promise((res) => sound.once('load', res));
  }

  /**
   * Scans the assets directory and creates a manifest of all available assets, split into categories.
   * Currently supports images and sounds.
   *
   * @private
   */
  _importAssets() {
    context.keys().forEach((filename) => {
      let [, id, ext] = filename.split('.'); // eslint-disable-line prefer-const
      const url = context(filename);

      id = id.substring(1);
      this._assets[id] = url;

      if (IMG_EXTENSIONS.indexOf(ext) > -1) {
        this._images[id] = url;
      }

      if (SOUND_EXTENSIONS.indexOf(ext) > -1) {
        this._sounds[id] = url;
      }
    });
  }
}

export default new AssetManager();
