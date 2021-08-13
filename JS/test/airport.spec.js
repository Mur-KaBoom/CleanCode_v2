const assert = require('chai').assert;

const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const MilitaryType = require('../models/MilitaryType');
const ExperimentalPlane = require('../Planes/experimentalPlane');
const ExperimentalTypes = require('../models/ExperimentalTypes');
const ClassificationLevel = require('../models/ClassificationLevel');
const { bomber, transport } = require('../models/MilitaryType');

describe('Airport', () => {

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.typeBomber),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.typeBomber),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.typeBomber),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.typeFighter),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.typeFighter),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.transport),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.highAltitude, ClassificationLevel.secret),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.vtol, ClassificationLevel.topSecret)
    ];
    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have military Planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getMilitaryPlaneOfAppropriateType(transport);
        assert(transportMilitaryPlanes.length > 0);
    });

    it('should sort passenger plane by capacity', () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert( JSON.stringify(expectedPlaneWithMaxPassengersCapacity) === JSON.stringify(planeWithMaxPassengerCapacity));
    });

    it('should sort planes by max load capacity', () => {
        let airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        for (let i = 0; i < airport.length - 1; i++) {
            assert(airport[i].getMaxLoadCapacity() > airport[i + 1].getMaxLoadCapacity());
        }
    })

    it('airport has at least one bomber military plane', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes  = airport.getMilitaryPlaneOfAppropriateType(bomber);
        assert(bomberMilitaryPlanes.length > 0);
    })

    it('airport has experimental planes with classification level higher than unclassified', () => {
        let airport = new Airport(planes);
        let experimentalPlanes  = airport.getPlanesOfAppropriateType(ExperimentalPlane);
        let hasNotOnlyUnclassifiedPlanes = false;
        experimentalPlanes.forEach( plane => {
            if(plane.classificationLevel !== ClassificationLevel.unclassified) {
                hasNotOnlyUnclassifiedPlanes = true;
            }
        });
        assert(hasNotOnlyUnclassifiedPlanes);
    });

});



