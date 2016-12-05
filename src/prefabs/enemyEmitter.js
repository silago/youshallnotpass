import {Enemy1, Enemy2, Enemy3}  from '../prefabs/enemy';

var EnemyEmitter = function() {
    this.init = function(game,enemies,player,waves) {
        this.game = game; 
        this.enemies = {
                           group: enemies,
                           types: {'Enemy1':Enemy1,'Enemy2':Enemy2, 'Enemy3':Enemy3}
                       };
        this.player  = player;
        this.waves = waves;
        return this;
    }
    this.interval = null;
    this.current_wave = -1;
    this.active = false;
    this.wave_countdown = 0;
    this.enemy_countdown = 0;
    this.enemy_counter   = 0;
    this.update = (()=>{
        var time = 1;
        if (!this.active) return;
        if (this.wave_countdown>0) {
            this.wave_countdown-=time;
            return;
        }

        if (this.enemy_countdown>0) {
            this.enemy_countdown-=time;
        } else {
            if (this.enemy_counter>0) {
                //Math.floor(Math.random() * 6) + 1
                this.spawn_monster();
                var range = this.waves[this.current_wave].interval;
                this.enemy_countdown = Math.floor(Math.random() * (range[1]-range[0]+1)) + range[0];
                this.enemy_counter--;
            } else {
                this.next_wave;
                this.next_wave();
            }
        }
    });

    this.spawn_monster = ((i)=>{
            var x = this.game.width-500;
            var y= this.player.children[0].y+parseInt((Math.random()*20));
            var available_monsters = [];
            for (var i in this.enemies.types) {
               if (this.waves[this.current_wave].enemies_types.indexOf(i)!=-1) {
                available_monsters.push(i);
               }
            }
            var e = new this.enemies.types[available_monsters[
                    Math.floor(Math.random()*available_monsters.length)
                ]](this.game,x,y,'',this.player);
            e.y-=e.vertical_offset;
            e.setTarget(this.player.children[0]);
            //var e = new Enemy1(this.game,x,y,'orcs1',this.player)
            this.enemies.group.add(e);
    });

    this.next_wave = (()=>{


        var label = this.game.add.text(this.game.width*0.5, this.game.height*0.5, 'WAVE '+(this.current_wave+1)+'!', {
                font: "65px Arial",
                fill: "#ff0044",
                align: "center"
            });
        label.anchor.set(0.5);
        setTimeout(() =>{
            label.destroy();   
        },2000);

        this.current_wave+=1;
        if (this.current_wave>=this.waves.length) {
            this.active = false;
            return;
        }
        var wave = this.waves[this.current_wave];
        this.enemy_counter  = wave['count'];
        this.wave_countdown = wave['timeout'];
    });
    this.start = (() => {
        this.active = true;
        this.next_wave();
        this.game.time.events.loop(
            1000,this.update,this
        )
    });
}
export default EnemyEmitter;
