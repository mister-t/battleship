const INIT_WIDTH = 10;
const INIT_HEIGHT = 10;

module.exports = class AI {
  constructor(opts) {
    const { width, height } = opts || {};

    this.WIDTH = width || INIT_WIDTH;
    this.HEIGHT = height || INIT_HEIGHT;
  }

  placeShip({ship, boardDimensions, shipsOnBoard}) {
    //ship = {width, height}
    //boardDimensions = {width, height}
    //shipsOnBoard = { type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}

    //Need to have randomness on the placement

  }

  bombNextLocation({boardDimensions, attackedSpaces, sunkShips}) {
    //ship = {width, height}
    //boardDimensions = {width, height}
    //shipsOnBoard = { type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}

    //Need to have randomness on the bomb location
  }


  getBoardDimensions() {
    return [this.WIDTH, this.HEIGHT];
  }
}