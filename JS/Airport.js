const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');

class Airport {

     getPlanesOfAppropriateType(type) {
        var listOfPlanesOfAppropriateType = [];
        for (let plane of this.planes) {
            if (plane instanceof type) {listOfPlanesOfAppropriateType.push(plane);}
        }
        return listOfPlanesOfAppropriateType;
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let passengerPlanes = this.getPlanesOfAppropriateType(PassengerPlane);
        passengerPlanes.sort((a,b) => b.getPassengersCapacity() - a.getPassengersCapacity());
        return passengerPlanes[0];
    }

    getMilitaryPlaneOfAppropriateType(requestedType){
        let militaryPlanes = this.getPlanesOfAppropriateType(MilitaryPlane);
        let militaryPlaneOfAppropriateType = [];
        militaryPlanes.forEach((plane) => {
            if (plane.getMilitaryType() == requestedType) {
                militaryPlaneOfAppropriateType.push(plane);
            }
        });
        return militaryPlaneOfAppropriateType;
    }

    constructor(planes) {
        this.planes = planes;
    }

    sortByMaxDistance() {
        return this.planes.sort((a, b) => (b.getMaxFlightDistance() - a.getMaxFlightDistance()));
    }

    sortByMaxSpeed() {
        return this.planes.sort((a, b) => (b.getMaxSpeed() - a.getMaxSpeed()));
    }

    sortByMaxLoadCapacity() {
        return this.planes.sort((a, b) => (b.getMaxLoadCapacity() - a.getMaxLoadCapacity()));
    }

    getPlanes() {
        return this.planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;
