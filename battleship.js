const { INIT_HEIGHT, INIT_WIDTH } = require('./constants');
const { getRandomValue, isVertical, isHorizontal, isOrientedProperly, isOverlapped, isSpaceTaken} = require('./utils');

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
    const { x1, x2, y1, y2 } = shipInfo;
    if (x1 >= 1 && x2 >= 1 && x1 <= this.WIDTH && x2 <= this.WIDTH && y1 >= 1 && y2 >= 1 && y1 <= this.HEIGHT && y2 <= this.HEIGHT) {
      return true;
    }
    return false;
  }

  placeShip({name, size}) {
    if (!size || !name) throw new Error('Unable to place ship: name or size not specified')

    let areValidCoors = false;
    const shipsAlreadyPlaced = this.getShipsAlreadyPlaced();
    let x1 = getRandomValue(this.WIDTH);
    let x2 = getRandomValue(this.WIDTH);
    let y1 = getRandomValue(this.HEIGHT);
    let y2 = getRandomValue(this.HEIGHT);

    while(!areValidCoors) {
      //constrict the size of the ship to that of the ship type
      if (isVertical(x1, x2)) {
        y2 = y1 + size;
      }
      else if (isHorizontal(y1, y2)) {
        x2 = x1 + size;
      }

      if (!this.isWithinBounds({x1, x2, y1, y2}) ||
          !isOrientedProperly({x1, x2, y1, y2}) ||
          isOverlapped({x1, x2, y1, y2, shipsAlreadyPlaced: this.shipsAlreadyPlaced})) { 
        x1 = getRandomValue(this.WIDTH);
        x2 = getRandomValue(this.WIDTH);
        y1 = getRandomValue(this.HEIGHT);
        y2 = getRandomValue(this.HEIGHT);
      } else {
        areValidCoors = true;
      }
    }
    return  {type: name, x1, x2, y1, y2};
  }

  ship({name, size}) {
    let shipInfo = this.placeShip({name, size});
    this.recordShipsPlaced(shipInfo)
    return shipInfo
  }
 
  recordShipsPlaced(shipInfo) {
    const {type, x1, x2, y1, y2} = shipInfo;
    if (!x1 || !x2 || !y1 || !y2 || !type) throw new Error('Unable to record new ship coordinates: missing x or y coordinates or ship type');
    this.shipsAlreadyPlaced.push(shipInfo);
  }

  getNewBombCoors() {
    while(true) {
      let x = getRandomValue(this.WIDTH);
      let y = getRandomValue(this.HEIGHT);

      if (x >= 1 && x <= this.WIDTH && y >= 1 && y <= this.HEIGHT) {
        return {x, y};
      }
    }
  }

  recordPlaceAttacked(coors) {
    const {x, y} = coors;
    if (!x || !y) throw new Error('Unable to record new bomb coordinates: missing x or y coordinate');
    this.getSpacesAttacked().push(coors);
  }

  placeBomb() {
    let found = false;
    let coors = this.getNewBombCoors();
    while(!found) {
      if (isSpaceTaken(coors, this.getSpacesAttacked())) {
        coors = this.getNewBombCoors();
      } else {
        found = true;
      }
    }
    return coors;
  }

  bomb() {
    const coors = this.placeBomb();
    this.recordPlaceAttacked(coors);
    return coors;
  }

  getSpacesAttacked() {
    return this.spacesAttacked;
  }
  getBoardDimensions() {
    return [this.WIDTH, this.HEIGHT];
  }

  getNumShipsPlaced() {
    return this.shipsAlreadyPlaced.length;
  }

  getShipsAlreadyPlaced() {
    return this.shipsAlreadyPlaced;
  }
}