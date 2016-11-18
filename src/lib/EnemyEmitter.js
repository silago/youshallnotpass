EnemyEmitter = function(enemies,player,waves) {
    this.init = function(enemies,player,waves) {
        this.game = getGame();
        this.enemies = enemies;
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
            var x = game.width-500;
            var y = 380+parseInt((Math.random()*50));
            var e = new window['Enemy'](this.game,x,y,'orcs',this.player)
            this.enemies.add(e);
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
    //this.enemies = getEnemies();
    //this.player  = getPlayer();


    //},interval);
}
