import { Container, Rectangle, Sprite, Graphics, Texture, Text } from "pixi.js";
import Scene from "./Scene";
import gsap from "gsap";
import Footer from "../components/Footer";

export default class Play extends Scene {
  async onCreated() {
    console.log("playing");
    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    const rect = new PIXI.Graphics();
    rect.beginFill(0xff0000);
    rect.drawRect(100, 100, 200, 100);
    this.addChild(rect);
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
