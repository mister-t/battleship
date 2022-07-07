const { INIT_HEIGHT, INIT_WIDTH, SHIPS } = require('./constants');
// const INIT_WIDTH = 10;
// const INIT_HEIGHT = 10;

// const SHIPS = {
//   DESTROYER : 2,
//   SUBMARINE : 3,
//   CRUISER : 3,
//   BATTLESHIP : 4,
//   CARRIER : 5
// };


const getRandomValue = (maxNum) => Math.floor(Math.random() * maxNum);

const isWithinBounds = (shipInfo) => {
  // { type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}
  if (!shipInfo) throw new Error('can not determine boundary conditions: shipInfo missing');

};

const isOverlapped = (shipInfo) => {
  // { type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}
};

module.exports = class AI {
  constructor(opts) {
    const { width, height } = opts || {};

    this.WIDTH = width || INIT_WIDTH;
    this.HEIGHT = height || INIT_HEIGHT;

    this.shipsAlreadyPlaced = []; //shipsAlreadyPlaced = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.enemyShipsSunk = []; //shipsAlreadyPlaced = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.spacesAttacked= []; // attackedSpaces = [{ x1: 3, y1: 4}]
  }

  placeShip(shipType) {
    if (!shipType) throw new Error('Unable to place ship: size not specified')

    const x1 = getRandomValue(this.WIDTH);
    const x2 = getRandomValue(this.WIDTH);
    const y1 = getRandomValue(this.HEIGHT);
    const y2 = getRandomValue(this.HEIGHT);

    return {type: shipType, x1, y1, x2, y2}
    //1. place a ship
    //2. place a ship within the board
    //3. place a ship within the board that does not overlap with existing ships
    //4. place a ship within the board randomly and that does not overlap with existing ships

    //destroyer - 2
    //submarine - 3
    //cruiser - 3
    //battleship - 4
    //carrier - 5
    //Need to have randomness on the placement
  }

  bombNextLocation({}) {
    //Need to have randomness on the bomb location
  }

  getBoardDimensions() {
    return [this.WIDTH, this.HEIGHT];
  }
}