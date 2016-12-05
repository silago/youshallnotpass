import BaseItem from '../lib/baseItem';


class BaseItemHat extends BaseItem {
    constructor(game,x,y,sprite,stats) {
        super(game,x,y,sprite,stats);
        this.type = this._types.TYPE_HAT;
    }
}


export default BaseItemHat;
