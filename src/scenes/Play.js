import Footer from "../components/Footer";
import Scene from "./Scene";
import { BitmapText, Sprite } from "pixi.js";
import Rover from "../core/Rover.js";
import Assets from "../core/AssetManager";

export default class Play extends Scene {
  async onCreated() {
    this.sortableChildren = true;
    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    footer.zIndex = 2;
    this.addChild(footer);

    // const rover = new Rover()

    let playBg = Sprite.from(Assets._assets.playscene);
    playBg.anchor.set(0.5);
    playBg.zIndex = -1;
    playBg.height= 1060;
    this.addChild(playBg);

    let lowerPlanet = Sprite.from(Assets._assets.planet1);
    lowerPlanet.zIndex = 0;
    lowerPlanet.anchor.set(0.2, 0.08);
    this.addChild(lowerPlanet);

    let upperPlanet = Sprite.from(Assets._assets.planet2);
    upperPlanet.zIndex = 0;
    upperPlanet.anchor.set(1.4, 0.95);
    this.addChild(upperPlanet);

    let testrover = Sprite.from(Assets._assets.rover);
    testrover.zIndex = 1;
    testrover.anchor.set(-4,-0.3);
    testrover.rotation = 3.15;
    this.addChild(testrover);
     
    let rovershadow = Sprite.from(Assets._assets.rovershadow);
    rovershadow.anchor.set(testrover.anchor.x + 0.1, testrover.anchor.y - 1.4);
    rovershadow.rotation = 3.15;
    rovershadow.zIndex = 1;
    this.addChild(rovershadow);

    let testrover2 = Sprite.from(Assets._assets.rover);
    testrover2.zIndex = 1;
    testrover2.anchor.set(-2.5,0);
    this.addChild(testrover2);
     
    let rovershadow2 = Sprite.from(Assets._assets.rovershadow);
    rovershadow2.anchor.set(testrover2.anchor.x + 0.1, testrover2.anchor.y - 1.3 );
    rovershadow2.zIndex = 1;
    this.addChild(rovershadow2)

    

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
