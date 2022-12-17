import Assets from "../core/AssetManager";

export function createExplosion(x, y) {
  const ssheetTexture = new PIXI.BaseTexture(Assets._assets.explosion);
  let w = 192;
  let h = 192;

  const explosionFrames = [
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(1 * w - w, 0, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(2 * w - w, 0, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(3 * w - w, 0, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(4 * w - w, 0, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(5 * w - w, 0, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(1 * w - w, h, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(2 * w - w, h, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(3 * w - w, h, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(4 * w - w, h, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(5 * w - w, h, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(1 * w - w, h * 2, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(2 * w - w, h * 2, w - 2, h)),
    new PIXI.Texture(ssheetTexture, new PIXI.Rectangle(3 * w - w, h * 2, w - 2, h)),
  ];

  let animatedExplosion = new PIXI.AnimatedSprite(explosionFrames);
  animatedExplosion.x = x;
  animatedExplosion.y = y;
  animatedExplosion.animationSpeed = 0.4;
  animatedExplosion.loop = false;
  return animatedExplosion;
}
