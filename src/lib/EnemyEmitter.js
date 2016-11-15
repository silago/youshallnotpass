EnemyEmitter = function(enemies,player) {
    this.init = function(enemies,player) {
        this.game = getGame();
        this.enemies = enemies;
        this.player  = player;
        return this;
    }
    this.interval = null;
    this.current_wave = -1;
    this.active = false;
    this.wave_countdown = 0;
    this.enemy_countdown = 0;
    this.enemy_counter   = 0;
    this.update = (()=>{
        console.log('1');
        var time = 1;
        if (!this.active) return;
        console.log('1.1');
        if (this.wave_countdown>0) {
            this.wave_countdown-=time;
            return;
        }
        console.log('2');

        if (this.enemy_countdown>0) {
            this.enemy_countdown-=time;
        console.log('3');
        } else {
            if (this.enemy_counter>0) {
                //Math.floor(Math.random() * 6) + 1

                console.log('4');
                this.spawn_monster();
                var range = this.waves[this.current_wave].interval;
                this.enemy_countdown = Math.floor(Math.random() * (range[1]-range[0]+1)) + range[0];
                this.enemy_counter--;
            } else {
                console.log('5');
                console.log(this.enemies);
                //this.next_wave;
            }
        }
    });

    this.spawn_monster = ((i)=>{
            console.log('spawn');
            var x = game.width-500;
            var y = 380+parseInt((Math.random()*50));
            var e = new Enemy(this.game,x,y,'orcs',this.player)
            this.enemies.add(e);
    });

    this.next_wave = (()=>{
        this.current_wave++;
        var i = this.current_wave;
        var wave = this.waves[i];
        this.enemy_counter  = wave['count'];
        this.wave_countdown = wave['timeout'];
        if (this.current_wave>this.waves.length) {
            this.active = false;
        }
    });
    this.start = (() => {
        this.active = true;
        this.next_wave();
        this.game.time.events.loop(
            1000,this.update,this
        )
    });
    //this.enemies = getEnemies();
    //this.player  = getPlayer();

    this.waves = [
        {
            'timeout':1,//itemout before start
            'count':10,
            'interval':[2,10],//monster emitting interval
            'enemies_types':[
                Enemy
            ]
        },

    ]

    //},interval);
}
