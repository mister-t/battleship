const INIT_WIDTH = 10;
const INIT_HEIGHT = 10;

module.exports = class AI {
  constructor(opts) {
    const { width, height } = opts || {};

    this.WIDTH = width || INIT_WIDTH;
    this.HEIGHT = height || INIT_HEIGHT;

    this.shipsAlreadyPlaced = []; //shipsAlreadyPlaced = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.shipsSunk = []; //shipsAlreadyPlaced = [{ type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}]
    this.spacesAttacked= []; // attackedSpaces = [{ x1: 3, y1: 4}]
  }

  placeShip(ship) {
    //ship = {width, height}
    //Need to have randomness on the placement
  }

  bombNextLocation({}) {
    //Need to have randomness on the bomb location
  }


  getBoardDimensions() {
    return [this.WIDTH, this.HEIGHT];
  }
}