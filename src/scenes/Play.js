import Footer from "../components/Footer";
import Scene from "./Scene";
import { BitmapText, Sprite, Texture } from "pixi.js";
import Rover from "../core/Rover.js";
import Assets from "../core/AssetManager";
import gsap from "gsap";
import { PixiPlugin } from "gsap/all";
gsap.registerPlugin(PixiPlugin);

export default class Play extends Scene {
  async onCreated() {
    this.sortableChildren = true;
    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    footer.zIndex = 2;

    let playBg = Sprite.from(Assets._assets.playscene);
    playBg.anchor.set(0.5);
    playBg.zIndex = -1;
    playBg.height = 1060;
    gsap.fromTo(
      playBg,
      { pixi:{scaleX: 1, scaleY: 1, brightness: 0.5}},
      { pixi:{scaleX: 1.1, scaleY: 1.1, brightness: 1, colorize:"purple", colorizeAmount:1},duration: 10, repeat: -1, yoyo: true, ease: "none" }
    );

    let lowerPlanet = Sprite.from(Assets._assets.planet1);
    lowerPlanet.anchor.set(0.5);
    lowerPlanet.position.set(window.innerWidth / 3, window.innerHeight / 2)

    let upperPlanet = Sprite.from(Assets._assets.planet2);
    upperPlanet.anchor.set(0.5);
    upperPlanet.position.set(-window.innerWidth / 2.7, -window.innerHeight / 2.8);
    

    const rover1X = -window.innerWidth / 3;
    const rover1Y = -window.innerHeight / 8;
    const rover2X = window.innerWidth / 3;
    const rover2Y = window.innerHeight / 8;

    let testrover = Sprite.from(Assets._assets.rover);
    testrover.zIndex = 1;
    testrover.rotation = 3.15;
    testrover.anchor.set(0.5);
    testrover.position.set(rover1X, rover1Y);

    let rovershadow = Sprite.from(Assets._assets.rovershadow);
    rovershadow.anchor.set(0.5);
    rovershadow.rotation = 3.15;
    rovershadow.zIndex = 1;
    rovershadow.position.set(rover1X, rover1Y - 60);

    let testrover2 = Sprite.from(Assets._assets.rover);
    testrover2.zIndex = 1;
    testrover2.anchor.set(0.5);
    testrover2.position.set(rover2X, rover2Y);

    let rovershadow2 = Sprite.from(Assets._assets.rovershadow);
    rovershadow2.anchor.set(0.5);
    rovershadow2.position.set(rover2X, rover2Y + 65);

    let activeShieldTexture = PIXI.Texture.from(Assets._assets.shieldactive);
    let inactiveShieldTexture = PIXI.Texture.from(
      Assets._assets.shieldinactive
    );

    let upperShield1 = Sprite.from(activeShieldTexture);
    upperShield1.zIndex = 1;
    upperShield1.anchor.set(0.5);
    upperShield1.rotation = 2.35;
    upperShield1.position.set(rover1X + 30, rover1Y + 140);

    let lowerShield1 = Sprite.from(inactiveShieldTexture);
    lowerShield1.zIndex = 1;
    lowerShield1.anchor.set(0.5);
    lowerShield1.rotation = 2.35;
    lowerShield1.position.set(rover1X + 150, rover1Y + 19);

    let upperShield2 = Sprite.from(activeShieldTexture);
    upperShield2.zIndex = 1;
    upperShield2.anchor.set(0.5);
    upperShield2.rotation = -0.8;
    upperShield2.position.set(rover2X - 30, rover2Y - 140);

    let lowerShield2 = Sprite.from(inactiveShieldTexture);
    lowerShield2.zIndex = 1;
    lowerShield2.anchor.set(0.5);
    lowerShield2.rotation = -0.8;
    lowerShield2.position.set(rover2X - 150, rover2Y - 19);

    let hpBar1 = Sprite.from(Assets._assets.roverhealthbar);
    hpBar1.anchor.set(0.5);
    hpBar1.position.set(rover1X + 15, rover1Y + 75);  

    let hpBar2 = Sprite.from(Assets._assets.roverhealthbar);
    hpBar2.anchor.set(0.5);
    hpBar2.position.set(rover2X - 15, rover2Y - 75);

    this.addChild(
      playBg,
      testrover,
      testrover2,
      rovershadow,
      rovershadow2,
      upperShield1,
      lowerShield1,
      upperShield2,
      lowerShield2,
      upperPlanet,
      lowerPlanet,
      hpBar1,
      hpBar2,
      footer
    );

  
    let lowershieldisactive = false;
    let uppershieldisactive = true;

    function keyboard(value) {
      const key = {};
      key.value = value;
      key.isDown = false;
      key.isUp = true;
      key.press = undefined;
      key.release = undefined;
      //The `downHandler`
      key.downHandler = (event) => {
        if (event.key === key.value) {
          if (key.isUp && key.press) {
            key.press();
          }
          key.isDown = true;
          key.isUp = false;
          event.preventDefault();
        }
      };

      //The `upHandler`
      key.upHandler = (event) => {
        if (event.key === key.value) {
          if (key.isDown && key.release) {
            key.release();
          }
          key.isDown = false;
          key.isUp = true;
          event.preventDefault();
        }
      };

      //Attach event listeners
      const downListener = key.downHandler.bind(key);
      const upListener = key.upHandler.bind(key);

      window.addEventListener("keydown", downListener, false);
      window.addEventListener("keyup", upListener, false);

      // Detach event listeners
      key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
      };

      return key;
    }

    const left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      down = keyboard("ArrowDown");

    left.press = () => {
      if (uppershieldisactive) {
        upperShield2.texture = inactiveShieldTexture;
        upperShield2.rotation = 0.8;
        lowerShield2.texture = activeShieldTexture;
        lowerShield2.rotation = -2.35;
        uppershieldisactive = false;
        lowershieldisactive = true;
        gsap.fromTo(lowerShield2, {pixi: {brightness: 2}}, {pixi:{brightness:1}, duration: 0.5});
      }
      down.press = () => {
        upperShield2.texture = inactiveShieldTexture;
        upperShield2.rotation = 0.8;
        lowerShield2.texture = activeShieldTexture;
        lowerShield2.rotation = -2.35;
        uppershieldisactive = false;
        lowershieldisactive = true;
        gsap.fromTo(lowerShield2, {pixi: {brightness: 2}}, {pixi:{brightness:1}, duration: 0.5})
      }
    };
    up.press = () => {
      if (lowershieldisactive) {
        upperShield2.texture = activeShieldTexture;
        upperShield2.rotation = -0.8;
        lowerShield2.texture = inactiveShieldTexture;
        lowerShield2.rotation = -0.8;
        uppershieldisactive = true;
        lowershieldisactive = false;
        gsap.fromTo(upperShield2, {pixi: {brightness: 2}}, {pixi:{brightness:1}, duration: 0.5});
      }
    };
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
