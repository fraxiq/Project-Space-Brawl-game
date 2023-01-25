import Assets from "../core/AssetManager";
import Scene from "./Scene";
import { Ticker } from "pixi.js";
import {gsap, TweenMax} from "gsap";
import { EventEmitter } from "eventemitter3";
import { PixiPlugin } from "gsap/all";
let lastSlideClicked = false;
gsap.registerPlugin(PixiPlugin);

export default class Tutorial extends Scene {
  // TODO: Have to figure out how to call things from the preloader

  constructor() {
    super();
  }

  preload() {
    const images = {};
    const sounds = {};
    return super.preload({ images, sounds });
  }

  //creating textures for all the slides so I can swap them later
  //needs to figure out preload so I can shorten this
  onCreated() {
    const ticker = Ticker.shared;
    ticker.autoStart = false;
    let counter = 0;
    let pointerOver = false;
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
    currentSlide.height = 1060;
    currentSlide.y = 10;

    this.addChild(currentSlide);

    const rightArrow = new PIXI.Sprite.from(Assets._assets.arrow);
    rightArrow.anchor.set(0.5);
    rightArrow.x = this.background.width / 2.5;
    rightArrow.alpha = 0.5;
    rightArrow.interactive = true;
    rightArrow.buttonMode = true;
    this.addChild(rightArrow);

    const leftArrow = new PIXI.Sprite.from(Assets._assets.leftArrow);
    leftArrow.anchor.set(0.5);
    leftArrow.x = -this.background.width / 2.5;
    leftArrow.interactive = true;
    leftArrow.buttonMode = true;
    leftArrow.alpha = 0.5;

    rightArrow.on("pointerover", () => {
      pointerOver = true;
      if (pointerOver) {
        rightArrow.alpha = 1;
      }
    });

    rightArrow.on("pointerout", () => {
      pointerOver = false;
      rightArrow.alpha = 0.5;
    });

    rightArrow.on("pointerdown", () => {
      if (counter == Slides.length - 1) {
        lastSlideClicked = true;
      }

      if (counter < Slides.length - 1) {
        counter++;
        currentSlide.texture = Slides[counter].texture;
        gsap.fromTo(
          currentSlide, {pixi: {scaleX: 0.8, scaleY: 0.8, saturation: 0}}, {pixi: {duration: 1, scaleX: 1, scaleY: 1, saturation: 1.5}, duration:0.7, ease: "power2.out"}
        );
      }

      this.addChild(leftArrow);
    });

    leftArrow.on("pointerover", () => {
      pointerOver = true;
      if (pointerOver) {
        leftArrow.alpha = 1;
      }
    });

    leftArrow.on("pointerout", () => {
      pointerOver = false;
      leftArrow.alpha = 0.5;
    });

    leftArrow.on("pointerdown", () => {
      if (counter > 0) {
        counter--;
        currentSlide.texture = Slides[counter].texture;
        gsap.fromTo(
          currentSlide.scale,
          { x: 0.8, y: 0.8 },
          { x: 1, y: 1, duration: 0.7, ease: "power2.out" }
        );
        if (counter == 0) {
          currentSlide.texture = Slides[counter].texture;
          this.removeChild(leftArrow);
        }
      }
    });
  }

  get finish() {
    return new Promise((res) => {
      setInterval(() => {
        if (lastSlideClicked) {
          res();
        }
      }, 200);
    });
  }
}
