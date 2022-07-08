const { SHIPS } = require('./constants');
const AI = require('./battleship');
const { isOverlapped, isVertical, isHorizontal, isSpaceTaken } = require('./utils');

const showGreenMsg = log => console.log("\u001b[32m" + log + "\u001b[0m");
const showRedMsg = log => console.log("\u001b[31m" + log + "\u001b[0m");

function describe(msg, cb) {
  console.log(`${msg}`);
  cb();
}

function test(msg, cb) {
  console.log(`\t${msg}`);
  cb();
};

function expect(msg, lhs) {
  return {
    toEqual: (rhs) => {
      if (lhs === rhs) {
        const log = `\t\texpect ${msg}: '${lhs}' to equal '${rhs}' = ${lhs === rhs}`;
        showGreenMsg(log);
      } else {
        const errMsg = `${msg} '${lhs}' IS NOT EQUAL to ${rhs}`;
        showRedMsg(errMsg);
        // throw new Error(errMsg);
      }
    },
    toExist: () => {
      if (lhs) {
        const log = `\t\texpect ${msg} '${typeof lhs === 'object' ? JSON.stringify(lhs) : lhs}' TO EXIST`;
        // console.log("%c" + log, "color:green")
        showGreenMsg(log);
      } else {
        const errMsg = `\t\texpect ${msg} '${lhs}' TO EXIST but found none`;
        showRedMsg(errMsg);
        // throw new Error(errMsg);
      }
    }
  }
};

describe('Battleship test suite:', () => {
  test('board dimensions:', () => {
    const ai = new AI();
    const [ width, height ] = ai.getBoardDimensions();
    expect('default board width', width).toEqual(10);
    expect('default board height', height).toEqual(10);
  });

  test('overriding board dimensions:', () => {
    const ai = new AI({width: 20, height: 20});
    const [ width, height ] = ai.getBoardDimensions();
    expect('default board width', width).toEqual(20);
    expect('default board height', height).toEqual(20);
  });

  test('placing a ship:', () => {
    const ai = new AI();
    try {
      ai.placeShip();
    } catch(errMsg) {
      expect('error message of empty ship size', errMsg).toExist();
    }

    const [ width, height ] = ai.getBoardDimensions();
    let shipInfo = ai.createShip(SHIPS.DESTROYER);
    const { type, x1, x2, y1, y2 } = shipInfo;
    let testShipSize = isVertical(x1, x2) ? y2 - y1 : x2 - x1;
    console.log('destroyer ship info: ', shipInfo)
    expect(`a ${SHIPS.DESTROYER.name} of size`, SHIPS.DESTROYER.size).toEqual(testShipSize);
    expect(`the list of ships already placed to have a size of `, 1).toEqual(1);

    expect(`the x1 coordinate '${x1}' of the ship to be between 1 and the board width of ${width}`, x1 >= 1 && x1 <= width).toEqual(true);
    expect(`the y1 coordinate '${y1}' of the ship to be between 1 and the board height of ${height}`, y1 >= 1 && y1 <= height).toEqual(true);
    expect(`the x2 coordinate '${x2}' of the ship to be between 1 and the board width of ${width}`, x2 >= 1 && x2<= width).toEqual(true);
    expect(`the y2 coordinate '${y2}' of the ship to be between 1 and the board height of ${height}`, y2 >= 1 && y2 <= height).toEqual(true);

    shipInfo = ai.createShip(SHIPS.CARRIER);
    const { type:carrierType, x1:carrierX1, x2:carrierX2, y1:carrierY1, y2:carrierY2 } = shipInfo;
    testShipSize = carrierX1 === carrierX2 ? carrierY2 - carrierY1 : carrierX2 - carrierX1;
    const numShips = ai.getNumShipsPlaced();
    expect(`a ship of type '${carrierType}' to be placed on the board`, carrierType ? ' ' : false).toExist();
    expect(`a '${SHIPS.CARRIER.name}' of size`, SHIPS.CARRIER.size).toEqual(testShipSize);
    expect(`the list of ships already placed to have a size of`, numShips).toEqual(2);

    expect(`a ship (with coordinates 'x1=${x1}','x2=${x2}','y1=${y1}','y2=${y2}') to be placed on the board either horizontal or vertical on the board`, isHorizontal(y1, y2) || isVertical(x1, x2)).toEqual(true);

    shipInfo = ai.placeShip(SHIPS.SUBMARINE);
    const shipsAlreadyPlaced = ai.getShipsAlreadyPlaced();
    const { type:submarineType, x1:submarineX1, x2:submarineX2, y1:submarineY1, y2:submarineY2 } = shipInfo;

    expect(`a ship of type '${submarineType}' (with coordinates 'X1=${submarineX1}','X2=${submarineX2}','Y1=${submarineY1}','Y2=${submarineY2}') to not overlap other ships already on the board`, !isOverlapped({x1: submarineX1, x2: submarineX2, y1: submarineY1, y2: submarineY1, shipsAlreadyPlaced}) ).toEqual(true);
  });

  test('placing the next bomb:', () => {
    const ai = new AI();
    let bombInfo = ai.placeBomb();
    const [ width, height ] = ai.getBoardDimensions();
    const { x, y } = bombInfo;
    ai.recordPlaceAttacked(bombInfo);

    expect(`the x coordinate '${x}' of the bomb to be between 1 and the board width of ${width}`, x >= 1 && x <= width).toEqual(true);
    expect(`the y coordinate '${y}' of the bomb to be between 1 and the board height of ${height}`, y >= 1 && y <= height).toEqual(true);

    //add more random attacked places
    ai.recordPlaceAttacked(ai.placeBomb());
    ai.recordPlaceAttacked(ai.placeBomb());
    ai.recordPlaceAttacked(ai.placeBomb());
    ai.recordPlaceAttacked(ai.placeBomb());

    const { x:x2, y:y2 } = ai.placeBomb();
    // console.log(ai.getSpacesAttacked());
    expect(`the x, y coordinates of '${x2}, ${y2}' to not be attacked already`, !isSpaceTaken({x:x2, y:y2}, ai.getSpacesAttacked())).toEqual(true);

    const { x:x3, y:y3 } = ai.bomb();
    const placesAttacked = ai.getSpacesAttacked(); 
    // console.log(placesAttacked)
    expect(`the x, y coordinates of '${x3}, ${y3}' to be recorded after the bomb has been placed`, isSpaceTaken({x:x3, y:y3}, placesAttacked)).toEqual(true);
  });
});