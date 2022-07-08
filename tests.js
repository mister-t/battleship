const { SHIPS } = require('./constants');
const AI = require('./battleship');
const { isOverlapped } = require('./utils');

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
        const log = `\t\texpect ${msg} '${lhs}' to equal '${rhs}': ${lhs === rhs}`;
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

    let shipInfo = ai.placeShip(SHIPS.DESTROYER);
    const { type, x1, x2, y1, y2 } = shipInfo;
    let testShipSize = x1 === x2 ? y2 - y1 : x2 - x1;
    expect(`a ${SHIPS.DESTROYER.name} of size`, SHIPS.DESTROYER.size).toEqual(testShipSize);
    expect(`the list of ships already placed to have a size of `, 1).toEqual(1);

    shipInfo = ai.placeShip(SHIPS.CARRIER);
    const { type:carrierType, x1:carrierX1, x2:carrierX2, y1:carrierY1, y2:carrierY2 } = shipInfo;
    testShipSize = carrierX1 === carrierX2 ? carrierY2 - carrierY1 : carrierX2 - carrierX1;
    const numShips = ai.getNumShipsPlaced();
    expect(`a ship of type ${carrierType} to be placed on the board`, carrierType ? ' ' : false).toExist();
    expect(`a ${SHIPS.CARRIER.name} of size`, SHIPS.CARRIER.size).toEqual(testShipSize);
    expect(`the list of ships already placed to have a size of`, numShips).toEqual(2);

    // expect('ships to not overlap a ship already placed on the board:', () => {

    // });
  });

  test('placing the next bomb:', () => {
    const ai = new AI();
    let bombInfo = ai.bombNextLocation();
    const [ width, height ] = ai.getBoardDimensions();
    const { x, y } = bombInfo;

    expect(`the x coordinate '${x}' of the bomb to be between 1 and the board width`, x >= 1 && x <= width).toEqual(true);
    expect(`the y coordinate '${y}' of the bomb to be between 1 and the board width`, y >= 1 && y <= height).toEqual(true);
  });
});