import Assets from "../core/AssetManager";
import Scene from "./Scene";
import { Ticker } from "pixi.js";
import gsap from "gsap";

export default class Countdown extends Scene {
  onCreated() {
    let counter = 3;
    const style = new PIXI.TextStyle({
      fontSize: 200,
      fontStyle: "oblique",
      fontWeight: 600,
      fill: ["#8c3b76", "#7d3786"],
      align: 'center'
    });
    let text = new PIXI.Text(counter, style);
    text.anchor.set(0.5);
    this.addChild(text);

    let timeId = setInterval(()=> {
        counter -= 1;
        text.text = counter;
        if (counter == 0){
            text.text = "GO";
            gsap.to(text.scale, {x:1.5, y:1.5, duration: 0.4, ease: "power2"});
            clearInterval(timeId);
        }
    }, 1000);

  }

  get finish() {
    return new Promise((res) => setTimeout(res, 4000));
  }
}
