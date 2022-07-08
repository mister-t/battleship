const { SHIPS } = require('./constants');
const AI = require("./battleship");

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
        console.log(`\t\texpect ${msg} '${lhs}' to equal '${rhs}': ${lhs === rhs}`)
      } else {
        const errMsg = `${msg} '${lhs}' IS NOT EQUAL to ${rhs}`;
        throw new Error(errMsg);
      }
    },
    toExist: () => {
      if (lhs) {
        console.log(`\t\texpect ${msg} '${typeof lhs === 'object' ? JSON.stringify(lhs) : lhs}' TO EXIST`)
      } else {
        const errMsg = `\t\texpect ${msg} '${lhs}' TO EXIST but found none`;
        throw new Error(errMsg);
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

    const shipInfo = ai.placeShip(SHIPS.DESTROYER);
    expect(`a ship of size ${SHIPS.DESTROYER.size} to be placed on the board`, shipInfo).toExist();
  });

    // expect('a new ship to be within the board dimensions:', () => {
    //   ai.placeShip(2);
    // });

    // expect('a new ship should not overlap a ship already placed on the board:', () => {

    // });

    // expect('a new ship to be randomly placed the board:', () => {

    // });
  // });
});