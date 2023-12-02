export class Die {
    _value:number = 1;
    held:boolean = false;

    constructor() { }

    get value() {
        return this._value;
    }

    set value(value:number) {
        if(value < 1 || value > 6) {
            throw RangeError(`Valid die values are 1-6, attempted to use ${value}`);
        }

        this._value = value;
    }
}
