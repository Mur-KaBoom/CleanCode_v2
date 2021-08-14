const Plane = require('./plane.abstract');

class Military extends Plane {

    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity, militaryType) {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
        this._militaryType = militaryType;
    }

    getMilitaryType() {
        return this._militaryType;
    }
}

module.exports = Military;