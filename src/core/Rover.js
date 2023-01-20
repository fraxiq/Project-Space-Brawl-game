import * as PIXI from 'pixi.js';
import AssetManager from './AssetManager';

class Rover {
    constructor(characterSprite, shieldSprites, health = 100) {
        this.characterSprite = new PIXI.Sprite(Assets.getImage('rover'));
        this.shieldSpriteActive = new PIXI.Sprite(Assets.getImage('shield-active'));
        this.shieldSpriteInactive = new PIXI.Sprite(Assets.getImage('shield-inactive'));
        this.health = health;

        this.setup();
    }

    setup() {
        this.addChild(characterSprite);
        characterSprite.x = 100;
        characterSprite.y = 100;


        // Add shield sprites to the stage
        for (let shieldSprite of this.shieldSprites) {
            this.addChild(shieldSprite);
        }

        // Create rocket sprite and add it to the stage
        this.rocketSprite = new PIXI.Sprite(Assets.getImage('rocket'));
        this.addChild(this.rocketSprite);
        this.rocketSprite.visible = false;

        // Create rocket path graphics and add it to the stage
        this.rocketPath = new PIXI.Graphics();
        this.addChild(this.rocketPath);
        this.rocketPath.visible = false;

        // Add keyboard event listeners
        document.addEventListener("keydown", (event) => this.onKeyDown(event));
    }

    // Function that will be called when the "spacebar" button is pressed
    shootRocket() {
        // Set the rocket sprite and path
    }
}