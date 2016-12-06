
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

        this.graphics = this.game.add.graphics(0, 0);

    // graphics.lineStyle(2, 0xffd900, 1);

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
        var left    = -1,
            right    =  1,
            up     = -1,
            down    =  1;
        var min_diff = 10;
        var points_counter  = 0;// points.length;
        //for (var points_counter in this.spellbook) {
        //        if (this.spellbook[points_counter].points.toString() == this.points.toString()) {
        //            this.spellbook[points_counter].cast()
        //            break;
        //        }
        //}

        this.points = [];
        this.check();
        this.bmd.clear();
        this.bmd.ctx.beginPath();
    }

    activate() {

        this.graphics.beginFill(0xFF3300);
        this.graphics.clear();
        
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
        var min_diff = 15;
        if (this.path.length==0) {
            this.path.push([x,y]);
            this.point(x,y);
            return;
        }


        var old = this.path[this.path.length-1];
        if (Math.abs(old[0]-x)+Math.abs(old[1]-y)>15) {
            this.path.push([x,y]);
            this.point(x,y);
            return;
        } else {
        }

        

    }

    point(x,y,color=0xFF00FF) {

                                        this.graphics.beginFill(color, 10);
                                        this.graphics.drawCircle(x, y, 10);
    }


    getDir(a,b,diff) {
        if (Math.abs(a-b)<diff) {
            return 0;
        }

        if (a-b<0) {
                return -1;
        } else {

                return 1;
        }
    }

    check() {
        if (this.path.length<2) return;
        var result = [0,0];
        this.graphics.clear();
        var prevdirx = 0;
        var prevdiry = 0;
        for (let i in this.path) {
            if (i==0) continue;
            let prevpoint = this.path[i-1];
            var point = this.path[i];
            var dirx = this.getDir(point[0],prevpoint[0],2); 
            var diry = this.getDir(point[1],prevpoint[1],1); 
            if (diry!=prevdiry || dirx!=prevdirx) {
                console.log(dirx,diry);
                prevdirx = dirx;
                prevdiry = diry;
                result.push([dirx,diry]);
                this.point(point[0],point[1],0x00FF00);
            } 
        }
        console.log(result.toString());
        this.point(point[0],point[1],0x00FF00);
    
        for (var points_counter in this.spellbook) {
                console.log (this.spellbook[points_counter].points.toString() , '>>',result.toString());
                if (this.spellbook[points_counter].points.toString() == result.toString()) {
                    this.spellbook[points_counter].cast()
                    break;
                }
        }
    }
}

export default DrawProcessor;

