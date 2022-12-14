import Splash from "./scenes/Splash";
import Play from "./scenes/Play";
import { Container } from "pixi.js";
import Tutorial from "./scenes/Tutorial";
import Countdown from "./scenes/Countdown";

/**
 * Main game stage, manages scenes/levels.
 *
 * @extends {PIXI.Container}
 */
export default class Game extends Container {
  static get events() {
    return {
      SWITCH_SCENE: "switch_scene",
    };
  }

  /**
   * @param {PIXI.Sprite} background
   */
  constructor({ background } = {}) {
    super();

    this._background = background;
    this.currentScene = null;
  }

  // haven't figured out scene swapping completely yet this needs work
  async start() {
    await this.switchScene(Splash, { scene: "splash" });
    await this.currentScene.finish;
  
    await this.switchScene(Tutorial, {scene: "tutorual"});
    await this.currentScene.finish;
    
    await this.switchScene(Countdown, {scene: "countdown"});
    await this.currentScene.finish;
    
    // await this.switchScene(Play, { scene: "play" });
    // await this.currentScene.finish;

  }

  /**
   * @param {Function} constructor
   * @param {String} scene
   */
  switchScene(constructor, scene) {
    this.removeChild(this.currentScene);
    this.currentScene = new constructor();
    this.currentScene.background = this._background;
    this.addChild(this.currentScene);

    this.emit(Game.events.SWITCH_SCENE, { scene });

    return this.currentScene.onCreated();
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    if (this.currentScene === null) return;

    this.currentScene.onResize(width, height);
  }
}
