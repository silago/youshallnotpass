Rain = function(game,data) {
        this.points=[0,1,2];
        this.sprite='rain';
        power = 20;
        this.cast=function() {
          var spell = game.add.sprite(game.input.x-250, game.input.y-250, this.sprite);
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.update = function () {
            console.log(this);
            var self  = this;
            if (game.physics.arcade.collide(spell, data.enemies,function(spell,enemy) {
              enemy.getHit(power);
            },function() {
              return true;
            },this));
          }
          setInterval(function() {
            spell.destroy();
          },2000);
        }
      };


Bolt = function(game,data) {
        //300 x 30
        this.points=[2,5];
        this.sprite='bolt';
        var power = 5;
        this.cast=function() {
          var spell = game.add.sprite(game.input.x, game.input.y-15, 'bolt');
          game.physics.enable(spell, Phaser.Physics.ARCADE);
          spell.body.velocity.x=300;
          spell.update = function () {
            if (game.physics.arcade.collide(spell, data.enemies,function(s,enemy) {
                    s.body.velocity.x = 0;
                    enemy.getHit(power);
                    //power = 0;
                    setInterval(function() {
                      s.destroy();
                    },2000);
            },function(){
              return true;
            },this));
          }
        }
      };
