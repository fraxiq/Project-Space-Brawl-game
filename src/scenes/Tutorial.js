import Assets from "../core/AssetManager";
import { Container, utils, Text, texture, Texture } from "pixi.js";
import Scene from "./Scene";
import { fit } from "../core/utils";
import config from "../config";

export default class Tutorial extends Scene {
  constructor() {
    super();
  }
  onCreated() {
    // this.background.width = 1214;
    // this.background.height = 734;
    console.log(this.background.width)
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
    currentSlide.width = this.background.width * 0.6;
    currentSlide.height = this.background.height * 0.6;
    this.addChild(currentSlide);

    const rightArrow = new PIXI.Sprite.from(Assets._assets.arrow);
    rightArrow.anchor.set(0.5);
    rightArrow.x = currentSlide.width / 2.2;
    this.addChild(rightArrow);
    rightArrow.interactive = true;
    rightArrow.buttonMode = true;

    const leftArrow = new PIXI.Sprite.from(Assets._assets.leftArrow);
    leftArrow.anchor.set(0.5);
    leftArrow.x = -currentSlide.width / 2.2;
    this.addChild(leftArrow);
    leftArrow.interactive = true;
    leftArrow.buttonMode = true;
    leftArrow.alpha = 0;
    2;
    rightArrow.on("pointerdown", () => {
      if (i < Slides.length - 1) {
        i++;
        currentSlide.texture = Slides[i].texture;
      }
      leftArrow.alpha = 1;
    });

    leftArrow.on("pointerdown", () => {
       if (i > 0) {
        i--;
        currentSlide.texture = Slides[i].texture;
        

        if (i == 0) {
          currentSlide.texture = Slides[i].texture;
          leftArrow.alpha = 0;
        }
      }
    });
  }
}
