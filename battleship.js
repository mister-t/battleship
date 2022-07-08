const { INIT_HEIGHT, INIT_WIDTH, SHIPS } = require('./constants');

const getRandomValue = (maxNum) => Math.floor(Math.random() * maxNum); //0 - 9

const isOverlapped = (shipInfo) => {
  // { type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}
};

module.exports = class AI {
  constructor(opts) {
    const { width, height } = opts || {};

    this.WIDTH = width || INIT_WIDTH;
    this.HEIGHT = height || INIT_HEIGHT;

    this.shipsAlreadyPlaced = []; //shipsAlreadyPlaced = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.enemyShipsSunk = []; //enemyShipsSunnk = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.spacesAttacked= []; // attackedSpaces = [{ x1: 3, y1: 4}]
  }

  isWithinBounds(shipInfo) {
    // { type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}
    if (!shipInfo) throw new Error('can not determine boundary conditions: shipInfo missing');
    // console.log(shipInfo)
    const { x1, x2, y1, y2, type } = shipInfo;
    if (x1 >= 0 && x2 >= 0 && x1 <= this.WIDTH && x2 <= this.WIDTH && y1 >= 0 && y2 >= 0 && y1 <= this.HEIGHT && y2 <= this.HEIGHT) {
      return true;
    }
    return false;
  }

  placeShip(shipType) {
    if (!shipType) throw new Error('Unable to place ship: size not specified')

    const x1 = getRandomValue(this.WIDTH);
    const x2 = getRandomValue(this.WIDTH);
    const y1 = getRandomValue(this.HEIGHT);
    const y2 = getRandomValue(this.HEIGHT);
    
    //1. place a ship
    //2. place a ship within the board
    if (this.isWithinBounds({x1, x2, y1, y2})) {
        this.shipsAlreadyPlaced.push({type: shipType.name, x1, y1, x2, y2});
      return {type: shipType.name, x1, y1, x2, y2};
    }
    return null;
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