import {
  Container,
  Rectangle,
  Sprite,
  Graphics,
  Texture,
  Text,
  BaseTexture,
} from "pixi.js";
import Scene from "./Scene";
import gsap from "gsap";
import Footer from "../components/Footer";
import config from "../config";
import Assets from "../core/AssetManager";
import {createExplosion} from "../components/Explosion";

export default class Play extends Scene {
  async onCreated() {
    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);
  }
  

  get finish() {
    return new Promise((res) => setTimeout(res, 2000));
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
