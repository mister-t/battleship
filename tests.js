const AI = require("./battleship");

const ai = new AI();

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
  test('board dimensions ', () => {
    const [ width, height ] = ai.getBoardDimensions();
    expect('default board width', width).toEqual(10);
    expect('default board height', height).toEqual(10);

  })
});