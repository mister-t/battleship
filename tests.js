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
        throw new Error(errMsg)
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

  })
});