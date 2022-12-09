import Assets from "../core/AssetManager";
import Scene from "./Scene";

export default class Tutorial extends Scene {
  // TODO: Have to figure out how to call things from the preloader
  preload() {
    const images = {
    };
    const sounds = {};
    return super.preload({ images, sounds });
  }

  //creating textures for all the slides so I can swap them later
  //needs to figure out preload so I can shorten this
  onCreated() {
    let i = 0;
    const Slide1 = new PIXI.Texture.from(Assets._assets.Slide1);
    const Slide2 = new PIXI.Texture.from(Assets._assets.Slide2);
    const Slide3 = new PIXI.Texture.from(Assets._assets.Slide3);

    const Slides = [
      PIXI.Sprite.from(Slide1),
      PIXI.Sprite.from(Slide2),
      PIXI.Sprite.from(Slide3),
    ];


    let currentSlide = new PIXI.Sprite.from(Assets._assets.Slide1);
    currentSlide.anchor.set(0.5); 
    console.log(this.background.width, this.background.height);
    currentSlide.height = 1060;
    currentSlide.y = 10;
    
    this.addChild(currentSlide);

    const rightArrow = new PIXI.Sprite.from(Assets._assets.arrow);
    rightArrow.anchor.set(0.5);
    rightArrow.x = this.background.width / 2.5;
    rightArrow.alpha = 0.6;
    rightArrow.interactive = true;
    rightArrow.buttonMode = true;
    this.addChild(rightArrow);

    const leftArrow = new PIXI.Sprite.from(Assets._assets.leftArrow);
    leftArrow.anchor.set(0.5);
    leftArrow.x = -this.background.width / 2.5;
    leftArrow.interactive = true;
    leftArrow.buttonMode = true;
    leftArrow.alpha = 0.6;

    rightArrow.on("pointerdown", () => {
      if (i < Slides.length - 1) {
        i++;
        currentSlide.texture = Slides[i].texture;
      }
      this.addChild(leftArrow);

    });

    leftArrow.on("pointerdown", () => {
      if (i > 0) {
        i--;
        currentSlide.texture = Slides[i].texture;

        if (i == 0) {
          currentSlide.texture = Slides[i].texture;
          this.removeChild(leftArrow);
        }
      }
    });
  }
}
