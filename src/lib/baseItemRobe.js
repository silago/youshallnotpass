import BaseItem from '../lib/baseItem';


class BaseItemRobe extends BaseItem {
    constructor(game,x,y,sprite,stats) {
        super(game,x,y,sprite,stats);
        this.type = this._types.TYPE_ROBE;
    }
}


export default BaseItemRobe;
