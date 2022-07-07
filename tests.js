const AI = require("./battleship");

const ai = new AI();

// const EQUALITY_OPS = {
//   toBeTrue: (lhs) => (rhs) => rhs === true,
//   toEqual: (lhs, rhs) => lhs === rhs
// };

function describe(msg, cb) {
  console.log(msg);
  cb();
}

function test(msg, cb) {
  console.log(msg);
  cb();
};

function expect(lhs) {
  return {
    toEqual: (rhs) => lhs === rhs
  }
};

describe('Battleship test suite:', () => {
  test('  board dimensions ', () => {
    const [ width, height ] = ai.getBoardDimensions();
    console.log(expect(width).toEqual(10));

  })
});