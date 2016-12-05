class BaseItem extends Phaser.Sprite {
    constructor(game,x,y,sprite,stats){
        super(game,x,y,sprite);
        this._types = {
            'TYPE_HAT': 0,
            'TYPE_ROBE':1
        };
        this.stats = {
            'mana':0,
            'health':0,
            'power':0,
        };
        this.type = null;
        this.shadow = this.addChild((new Phaser.Sprite(this.game,this.x,this.y,'border')));
        this.shadow.visible = false;
        this.stats = {
            health:0,
            mana:0
        };
        if (stats) {
            this.stats = stats;
        }
    }

    equipe() {
        this.equiped = true;
        this.shadow.visible = true;
        return this;
    }

    unequipe() {
        this.equiped = false;
        this.shadow.visible = false;
        return this;
    }

    init() {
        this.equiped = false;
    }
}

export default BaseItem;
