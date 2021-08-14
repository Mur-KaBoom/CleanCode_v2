const PassengerPlane = require('./planes/passenger');

class Airport {
    
    constructor(planes) {
        this.planes = planes;
    }

    getPlanesOfAppropriateType(type) {
        var listOfPlanesOfAppropriateType = [];
        for (const plane of this.planes) {
            if (plane instanceof type) {listOfPlanesOfAppropriateType.push(plane);}
        }
        return listOfPlanesOfAppropriateType;
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        const passengerPlanes = this.getPlanesOfAppropriateType(PassengerPlane);
        passengerPlanes.sort((a,b) => b.getPassengersCapacity() - a.getPassengersCapacity());
        return passengerPlanes[0];
    }

    sortByMaxDistance() {
        return this.planes.sort((a, b) => b.getMaxFlightDistance() - a.getMaxFlightDistance());
    }

    sortByMaxSpeed() {
        return this.planes.sort((a, b) => b.getMaxSpeed() - a.getMaxSpeed());
    }

    sortByMaxLoadCapacity() {
        return this.planes.sort((a, b) => b.getMaxLoadCapacity() - a.getMaxLoadCapacity());
    }

    beautifulOutput(message, planes){
        console.log(message);
        console.table(planes);
    }
}

module.exports = Airport;
