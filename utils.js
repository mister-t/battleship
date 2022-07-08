const getRandomValue = (maxNum) => Math.floor(Math.random() * maxNum + 1); //1 - 10 on a 10X10 board

const isVertical = (x1, x2) => x1 === x2;
const isHorizontal = (y1, y2) => y1 === y2;
const isWithin = (start, end, val) => val >= start && val <= end;

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

const isOrientedProperly = ({x1, x2, y1, y2}) => {
  if (x1 === x2 && y1 <= y2) return true; //placed vertically
  if (y1 === y2 && x1 <= x2) return true; //placed horizontally
  return false;
};

module.exports = {
  getRandomValue,
  isOverlapped,
  isVertical,
  isHorizontal,
  isOrientedProperly 
}