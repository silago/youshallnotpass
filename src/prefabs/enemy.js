import HealthBar from '../prefabs/healthBar';

class BaseEnemy extends Phaser.Sprite {
    constructor(game,x,y,sprite,frame) {
        super(game,x,y,sprite,frame);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.speed = 150;
        this.damage = 10;
        this.game = game;
        this.health = 25;
        this.vertical_offset = 60;

        this.attack_cooldown = 1*1000;
        this.attack_timer    = 0;
        this.exp    = 1;

        this.animations.add('walk');
        this.animations.play('walk',2,true);
        this.immovable = true;
    }    
    
    init() {
        this.indicator = new HealthBar({
                            game: this.game,
                            x: this.position.x,
                            y: this.position.y,
                            seconds: this.health,
                            parent: this
                        });
        this.body.velocity.x=-this.speed;;
    }

    getHit(damage) {
        this.health-=damage;
        this.indicator.timerTick(damage);
        if (this.health<=0) {
            this.game.global.set_exp(this.exp);
            this.destroy();
        }
    }
    
    setTarget(player) {
        this.player = player;
    }
    update() {
            this.indicator.sprite.x = this.position.x;
            this.indicator.sprite.y = this.position.y;
            this.indicator.setPos(this.position.x);
            //if (false)
            if (typeof this.player!='undefined')
            if (this.game.physics.arcade.collide(this, this.player,function(enemy,player) {
              if (typeof player.getHit == 'function') {
                  this.attack_timer-=this.game.time.elapsed;
                  if (this.attack_timer<=0) {
                      this.player.getHit(this.damage);
                      this.attack_timer = this.attack_cooldown;
                  }
              }
            },function(){
              return true;
            },this));
    }
    //game.add.existing(this);
}

class Enemy1 extends BaseEnemy{
    constructor(game, x, y, frame) {
        super(game, x, y, 'orcs1', frame);
        this.speed = 200;
        this.damage = 10;
        this.health = 4;
		this.init();
    }
}


class Enemy2 extends BaseEnemy { 
    constructor(game, x, y, frame) {
        super(game, x, y, 'orcs2', frame);
        this.speed = 100;
		this.damage = 10;
        this.health = 10;
        this.init();
    }
}


class Enemy3 extends BaseEnemy { 
    constructor(game, x, y, frame) {
        super(game, x, y, 'orcs3', frame);
        this.speed = 250;
		this.damage = 10;
        this.health = 6;
        this.vertical_offset = 120
        this.init();
    }
}

export {Enemy1, Enemy2, Enemy3}
