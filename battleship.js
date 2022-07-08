const { INIT_HEIGHT, INIT_WIDTH } = require('./constants');

const getRandomValue = (maxNum) => Math.floor(Math.random() * maxNum); //0 - 9

const isVertical = (x1, x2) => x1 === x2;
const isHorizontal = (y1, y2) => y1 === y2;
const isWithin = (start, end, val) => val >= start && val <= end;

const isOrientedProperly = ({x1, x2, y1, y2}) => {
  if (x1 === x2 && y1 <= y2) return true; //placed vertically
  if (y1 === y2 && x1 <= x2) return true; //placed horizontally
  return false;
}

module.exports = class AI {
  constructor(opts) {
    const { width, height } = opts || {};

    this.WIDTH = width || INIT_WIDTH;
    this.HEIGHT = height || INIT_HEIGHT;

    this.shipsAlreadyPlaced = []; //shipsAlreadyPlaced = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.enemyShipsSunk = []; //enemyShipsSunnk = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.spacesAttacked= []; // attackedSpaces = [{ x1: 3, y1: 4}]
  }

  isOverlapped({x1, x2, y1, y2}) {
    for (let ship of this.shipsAlreadyPlaced) {
      const { x1:shipX1, x2:shipX2, y1:shipY1, y2:shipY2 } = ship;

      if (isVertical(shipX1, shipX2) && 
          isVertical(x1, x2) && 
          isVertical(x1, shipX1) &&  //lying in the same axis
          (isWithin(shipY1, shipY2, y1) || isWithin(shipY1, shipY2, y2))) return true;

      if (isHorizontal(shipY1, shipY2) && 
          isHorizontal(y1, y2) && 
          isHorizontal(y1, shipY1) && //lying in the same axis
          (isWithin(shipX1, shipX2, x1) || isWithin(shipX1, shipX2, x2))) return true;
    }
    return false;
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

      if (isVertical(x1, x2)) {
        y2 = y1 + size;
      }
      else if (isHorizontal(y1, y2)) {
        x2 = x1 + size;
      }

      if (this.isWithinBounds({x1, x2, y1, y2}) && 
          isOrientedProperly({x1, x2, y1, y2}) &&
          !this.isOverlapped({x1, x2, y1, y2})) {
        coordinates = {type: name, x1, y1, x2, y2};
        this.shipsAlreadyPlaced.push(coordinates);
        areValidCoors = true;
      }

      if (areValidCoors) return coordinates;
    }
    return null;
    //3. place a ship within the board that does not overlap with existing ships
  }

  bombNextLocation({}) {
    //Need to have randomness on the bomb location
  }

  getBoardDimensions() {
    return [this.WIDTH, this.HEIGHT];
  }

  getNumShipsPlaced() {
    return this.shipsAlreadyPlaced.length;
  }
}