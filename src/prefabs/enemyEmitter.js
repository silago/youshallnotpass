import {Enemy1, Enemy2}  from '../prefabs/enemy';

var EnemyEmitter = function() {
    this.init = function(game,enemies,player,waves) {
        this.game = game; 
        this.enemies = {
                           group: enemies,
                           types: {'Enemy1':Enemy1,'Enemy2':Enemy2}
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
                console.log('enemies left',this.enemy_counter)
            } else {
                this.next_wave;
                this.next_wave();
            }
        }
    });

    this.spawn_monster = ((i)=>{
            console.log('spawn');
            var x = this.game.width-500;
            
            var y= this.player.children[0].y-30+parseInt((Math.random()*20));
            var available_monsters = [];
            for (var i in this.enemies.types) {
               console.log(i);
                console.log(this.waves[this.current_wave].enemies_types);
               if (this.waves[this.current_wave].enemies_types.indexOf(i)!=-1) {
                available_monsters.push(i);
               }
            }
            console.log(available_monsters);
            console.log(this.enemies);
            var e = new this.enemies.types[available_monsters[
                    Math.floor(Math.random()*available_monsters.length)
                ]](this.game,x,y,'',this.player);
            //var e = new Enemy1(this.game,x,y,'orcs1',this.player)
            this.enemies.group.add(e);
    });

    this.next_wave = (()=>{
        console.log('next_wave');
        this.current_wave+=1;
        if (this.current_wave>=this.waves.length) {
            this.active = false;
            return;
        }
        var wave = this.waves[this.current_wave];
        console.log(this.current_wave, wave, this.waves);
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
