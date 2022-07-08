const getRandomValue = (maxNum) => Math.floor(Math.random() * maxNum + 1); //1 - 10 on a 10X10 board

const isVertical = (x1, x2) => x1 === x2;
const isHorizontal = (y1, y2) => y1 === y2;
const isWithin = (start, end, val) => val >= start && val <= end;

const isSpaceTaken = (coordinates, spaces) => spaces.some(space =>  space.x === coordinates.x && space.y === coordinates.y);

const isOverlapped = ({x1, x2, y1, y2, shipsAlreadyPlaced}) => {
  for (let ship of shipsAlreadyPlaced) {
    const { x1:shipX1, x2:shipX2, y1:shipY1, y2:shipY2 } = ship;

    if (isVertical(shipX1, shipX2) && 
        isVertical(x1, x2) && 
        isVertical(x1, shipX1) &&  //lying on the same axis
        (isWithin(shipY1, shipY2, y1) || isWithin(shipY1, shipY2, y2))) return true;

    if (isHorizontal(shipY1, shipY2) && 
        isHorizontal(y1, y2) && 
        isHorizontal(y1, shipY1) && //lying on the same axis
        (isWithin(shipX1, shipX2, x1) || isWithin(shipX1, shipX2, x2))) return true;
  }
  return false;
};

const isWithinBounds = (shipInfo, boardWidth, boardHeight) => {
  // { type: 'cruiser', x1: 3, y1: 4, x2: 3, y2: 6}
  if (!shipInfo) throw new Error('can not determine boundary conditions: shipInfo missing');
  // console.log(shipInfo)
  const { x1, x2, y1, y2 } = shipInfo;
  if (x1 >= 1 && x2 >= 1 && x1 <= boardWidth && x2 <= boardWidth && y1 >= 1 && y2 >= 1 && y1 <= boardHeight && y2 <= boardHeight) {
    return true;
  }
  return false;
}

const isOrientedProperly = ({x1, x2, y1, y2}) => {
  if (x1 === x2 && y1 <= y2) return true; //placed vertically
  if (y1 === y2 && x1 <= x2) return true; //placed horizontally
  return false;
};

const getNewShipCoors = ({WIDTH, HEIGHT}) => {
    const x1 = getRandomValue(WIDTH);
    const x2 = getRandomValue(WIDTH);
    const y1 = getRandomValue(HEIGHT);
    const y2 = getRandomValue(HEIGHT);
    return {x1, x2, y1, y2};
};

const areBadCoors = ({x1, x2, y1, y2, WIDTH, HEIGHT, shipsAlreadyPlaced}) => {
  if (!x1 || !x2 || !y1 || !y2 || !WIDTH || !HEIGHT || !shipsAlreadyPlaced) throw new Error('Missing parameters: unable to determine coordinates');
  return !isWithinBounds({x1, x2, y1, y2}, WIDTH, HEIGHT) ||
      !isOrientedProperly({x1, x2, y1, y2}) ||
      isOverlapped({x1, x2, y1, y2, shipsAlreadyPlaced});
};

const scaleShipToSize = ({x1, x2, y1, y2, size}) => {
  //constrict the size of the ship to that of the ship type
  if (isVertical(x1, x2)) {
    y2 = y1 + size;
  }
  else if (isHorizontal(y1, y2)) {
    x2 = x1 + size;
  }

  return {x1, x2, y1, y2, size};
}

module.exports = {
  getRandomValue,
  getNewShipCoors,
  isOverlapped,
  isVertical,
  isHorizontal,
  isOrientedProperly,
  isSpaceTaken,
  isWithinBounds,
  areBadCoors,
  scaleShipToSize
}