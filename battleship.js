const { INIT_HEIGHT, INIT_WIDTH } = require('./constants');
const { getRandomValue, isSpaceTaken, getNewShipCoors, areBadCoors, scaleShipToSize } = require('./utils');

module.exports = class AI {
  constructor(opts) {
    const { width, height } = opts || {};

    this.WIDTH = width || INIT_WIDTH;
    this.HEIGHT = height || INIT_HEIGHT;

    this.shipsAlreadyPlaced = []; //shipsAlreadyPlaced = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.enemyShipsSunk = []; //enemyShipsSunnk = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.spacesAttacked= []; // attackedSpaces = [{ x1: 3, y1: 4}]
  }

  placeShip({name, size}) {
    if (!size || !name) throw new Error('Unable to place ship: name or size not specified')

    let areValidCoors = false;
    const { WIDTH, HEIGHT, shipsAlreadyPlaced } = this;
    let { x1, x2, y1, y2 } = getNewShipCoors({WIDTH, HEIGHT});

    while(!areValidCoors) {
      const scaledShip = scaleShipToSize({x1, x2, y1, y2, size});
      x1 = scaledShip.x1;
      x2 = scaledShip.x2;
      y1 = scaledShip.y1;
      y2 = scaledShip.y2;

      if (areBadCoors({x1, x2, y1, y2, WIDTH, HEIGHT, shipsAlreadyPlaced})) {
        let newCoors = getNewShipCoors({WIDTH, HEIGHT});
        x1 = newCoors.x1;
        x2 = newCoors.x2;
        y1 = newCoors.y1;
        y2 = newCoors.y2;
      } else {
        areValidCoors = true;
      }
    }
    return  {type: name, x1, x2, y1, y2};
  }

  createShip({name, size}) {
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