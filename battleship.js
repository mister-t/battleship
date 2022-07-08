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
    if (x1 >= 0 && x2 >= 0 && x1 <= this.WIDTH && x2 <= this.WIDTH && y1 >= 0 && y2 >= 0 && y1 <= this.HEIGHT && y2 <= this.HEIGHT) {
      return true;
    }
    return false;
  }

  placeShip({name, size}) {
    if (!size || !name) throw new Error('Unable to place ship: size not specified')
    let areValidCoors = false;
    let coordinates = null;

    while(!areValidCoors) {
      let x1 = getRandomValue(this.WIDTH);
      let x2 = getRandomValue(this.WIDTH);
      let y1 = getRandomValue(this.HEIGHT);
      let y2 = getRandomValue(this.HEIGHT);

      //constrict the size of the ship to that of the ship type
      if (isVertical(x1, x2)) {
        y2 = y1 + size;
      }
      else if (isHorizontal(y1, y2)) {
        x2 = x1 + size;
      }

      if (this.isWithinBounds({x1, x2, y1, y2}) && 
          isOrientedProperly({x1, x2, y1, y2}) &&
          !isOverlapped({x1, x2, y1, y2, shipsAlreadyPlaced: this.shipsAlreadyPlaced})) {
        coordinates = {type: name, x1, y1, x2, y2};
        this.shipsAlreadyPlaced.push(coordinates);
        areValidCoors = true;
      }

      if (areValidCoors) return coordinates;
    }
    return null;
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

  getSpacesAttacked() {
    return this.spacesAttacked;
  }
  getBoardDimensions() {
    return [this.WIDTH, this.HEIGHT];
  }

  getNumShipsPlaced() {
    return this.shipsAlreadyPlaced.length;
  }
}