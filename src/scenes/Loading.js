import Scene from './Scene';
import AssetManager from './AssetManager';
import Tutorial from './Tutorial';

export default class LoadingScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
        this.loadingText = new PIXI.Text("Loading...", {
            fontSize: 24,
            fill: 0xffffff
        });
        this.loadingText.x = app.screen.width / 2;
        this.loadingText.y = app.screen.height / 2;
        this.loadingText.anchor.set(0.5);
        this.addChild(this.loadingText);
    }

    async preload({ images, sounds } = {}) {
        return AssetManager.load({ images, sounds }, this.onLoadProgress.bind(this))
            .then(() => AssetManager.prepareImages(images));
    }

    onLoadProgress(progress) {
        this.loadingText.text = `Loading... ${progress}%`;
    }

    async onCreated() {
        await super.onCreated();
        this.game.switchScene(Tutorial); // Switch to the next scene (Tutorial)
    }
}
