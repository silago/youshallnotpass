Enemy = function(game,x,y,resource,player) {
    Object.setPrototypeOf(this, Object.create(GameObject.prototype));
    GameObject.call(this, game,x,y,resource);
    var prototype = Object.getPrototypeOf(this);
    this.damage = 10;
    this.health = 25;

    this.indicator = new VisualTimer({
                        game: game,
                        x: this.position.x,
                        y: this.position.y,
                        seconds: this.health,
                        parent: this
                    });

    this.attack_cooldown = 1*1000;
    this.attack_timer    = 0;
    this.getHit = function(damage) {
        this.health-=damage;
        this.indicator.timerTick(damage);
        if (this.health<=0) {
            this.destroy();
        }
    }
    this.strike = function() {
    }
    this.walk = function() {
        this.body.velocity.x=-150;
        this.animations.add('walk');
        this.animations.play('walk',2,true);
        return this;
    }
    this.start  =function() {
        this.walk();

    }
    this.update = function() {
            this.indicator.sprite.x = this.position.x;
            this.indicator.sprite.y = this.position.y;
            this.indicator.setPos(this.position.x);

            if (game.physics.arcade.collide(this, player,function(enemy,player) {
              if (typeof player.getHit == 'function') {
                  this.attack_timer-=game.time.elapsed;
                  if (this.attack_timer<=0) {
                      player.getHit(this.damage);
                      this.attack_timer = this.attack_cooldown;
                  }
              }
            },function(){
              return true;
            },this));
    }
    game.add.existing(this);

    this.add();
    this.walk();
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.immovable = true;
}
