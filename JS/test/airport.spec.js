const assert = require('chai').assert;

const MilitaryPlane = require('../models/planes/military');
const PassengerPlane = require('../models/planes/passenger');
const Airport = require('../models/airport');
const { MILITARY_TYPE } = require('../enums/militaryType.enum');
const ExperimentalPlane = require('../models/planes/experimental');
const { EXPERIMENTAL_TYPE  } = require('../enums/experimentalTypes.enum');
const { CLASSIFICATION_LEVEL } = require('../enums/classificationLevel.enum');

describe('Airport', () => {

    const planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MILITARY_TYPE.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MILITARY_TYPE.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MILITARY_TYPE.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MILITARY_TYPE.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MILITARY_TYPE.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MILITARY_TYPE.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, EXPERIMENTAL_TYPE.HIGH_ALTITUDE, CLASSIFICATION_LEVEL.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, EXPERIMENTAL_TYPE.VTOL, CLASSIFICATION_LEVEL.TOP_SECRET)
    ];
    const planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    beforeEach(() => {
        airport = new Airport(planes);
    });

    it('should have Military plane with Transport type', () => {
        assert(airport.getPlanesOfAppropriateType(MilitaryPlane).some(plane => plane.getMilitaryType() === MILITARY_TYPE.TRANSPORT));
    });

    it('should have Passenger plane with Max Passenger Capacity', () => {
        assert( JSON.stringify(airport.getPassengerPlaneWithMaxPassengersCapacity()) === JSON.stringify(planeWithMaxPassengerCapacity));
    });

    it('should have Plane with Max Load Capacity', () => {
        airport.sortByMaxLoadCapacity();
        for (let i = 0; i < airport.length - 1; i++) {
            assert(airport[i].getMaxLoadCapacity() > airport[i + 1].getMaxLoadCapacity());
        }
    })

    it('should have Military plane with Bomber type', () => {
        assert(airport.getPlanesOfAppropriateType(MilitaryPlane).some(plane => plane.getMilitaryType() === MILITARY_TYPE.BOMBER));
    })

    it('should have Experimental planes with Classification level higher than Unclassified', () => {
        assert(airport.getPlanesOfAppropriateType(ExperimentalPlane).some(plane => plane.classificationLevel !== CLASSIFICATION_LEVEL.UNCLASSIFIED));
    });

});



