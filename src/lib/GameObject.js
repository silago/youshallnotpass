GameObject = function( game,x,y,resource) {
    Object.setPrototypeOf(this, Object.create(Phaser.Sprite.prototype));
    Phaser.Sprite.call(this, game,x,y,resource);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.add = function() {
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        return this;
    }
}
