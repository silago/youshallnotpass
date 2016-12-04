
//import HealthBar from '../prefabs/healthBar';

class DrawProcessor extends Phaser.Sprite {
    constructor(game,w,h,input,spellbook,bmd) {
        super(0,0);
        //spellbook.forEach(item) {
        //    registerSpell
        //}
        this.input = input;
        this.game = game;
        this.spellbook = spellbook;
        this.matchSignal = new Phaser.Signal();

        this.points = [];
        this.path   = [];
        this.active = false;
        this.game = game;
        //this.bmd = new Phaser.BitmapData(this.game,w,h);

        this.bmd = this.game.add.bitmapData(800,600);
        this.bmd.ctx.strokeStyle = "red";
        this.bmd.ctx.lineWidth = 6;
        var sprite = this.game.add.sprite(0, 0, this.bmd);

        this.bmd.ctx.beginPath();
        this.bmd.ctx.lineWidth = 6;
        this.bmd.ctx.stroke();
        this.bmd.dirty = true;

        this.graphics = this.game.add.graphics(800, 600);
        this.graphics.beginFill(0xFF3300);
        //this.setTexture(this.bmd);

        //this.spellbook = [
        //    [
        //        [0,0],
        //        [1,1],
        //        [1,-1]
        //    ],
        //    [
        //        [0,0],
        //        [1,-1],
        //        [1,1]
        //    ]

        //];
    }

      

    draw() {
        this.bmd.ctx.lineTo(this.game.input.x, this.game.input.y);
        this.bmd.ctx.stroke();
        this.bmd.dirty = true;
    } 

    deactivate() {
        this.active = false;
        //if (this.points.length>2) {
        //    this.check();
        //}

        var left    = -1,
            right    =  1,
            up     = -1,
            down    =  1;
        var min_diff = 10;
        var points_counter  = 0;// points.length;
        for (var points_counter in this.spellbook) {
                if (this.spellbook[points_counter].points.toString() == this.points.toString()) {
                    this.spellbook[points_counter].cast()
                    break;
                }
        }

        this.points = [];
        this.bmd.clear();
        this.bmd.ctx.beginPath();
    }

    activate() {
        this.active = true;
        this.points = [[0,0]];
        this.path   = [];
    }

    update() {
        if (!this.active) {
            return;
        }
        var x = this.game.input.x;
        var y = this.game.input.y;
        this.process(x,y);
        this.draw();
    }

    process(x,y) {

        if (undefined == this.path[ 2 ]) {
                this.path[2] = [x,y];
        } else if (undefined == this.path[1]) {
                if(Math.abs(this.path[2][0]-x)+Math.abs(this.path[2][1]-y)>15) {
                    this.path[1] = [x,y];
                }
        } else {
            if (undefined == this.path[0])  {
                this.path[0] = [x,y];
            } else if ((Math.abs(this.path[1][0]-x) + Math.abs(this.path[1][1]-y))>15) {
                var tmp_0 = this.path[0];
                this.path[0] = [x,y];
                var new_point = this.check();
                if (new_point != undefined ) {

            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.drawRect(x, y, 10, 10);
            window.graphics = this.graphics;
                    this.points.push(new_point);
                console.log(this.path.toString());
                console.log(this.points.toString());
                } else {
                }
                
                //this.check();
                this.path[2] = this.path[1];
                this.path[1] = tmp_0;//this.path[0];
            }
        }
    }


    check() {
            var [_0, _1, _2] =  this.path;

            if (_0.toString() == _1.toString() || _1.toString() == _2.toString()) {
                return undefined;
            }
            var min_diff=15;
            var current_direction_x = 0;
            var current_direction_y = 0;
            if (_1[0]-_0[0]<min_diff)  {
                current_direction_x = 1;
            } else if (_1[0]-_0[0]>min_diff ) {
                current_direction_x = -1;
            }
            if (_1[1]-_0[1]<min_diff)  {
                current_direction_y = 1;
            } else if (_1[1]-_0[1]>min_diff ) {
                current_direction_y = -1;
            }
            var a  = true;
            if (this.points.length>0) {
                var _prev = this.points[this.points.length-1];
                if (_prev[0]==current_direction_x && _prev[1]==current_direction_y) {
                    a = false;
                }
            }
            if (a)  {
                return [
                    current_direction_x,
                    current_direction_y
                ];
            }
            return undefined;
    }
}

export default DrawProcessor;

