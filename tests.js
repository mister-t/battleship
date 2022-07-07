const AI = require("./battleship");

const ai = new AI();

const EQUALITY_OPS = {
  toBeTrue: (lhs) => (rhs) => rhs === true,
  toEqual: (lhs, rhs) => lhs === rhs
};

function describe(msg, cb) {
  console.log(msg);
  cb();
}

function test(msg, cb) {
  console.log(msg);
  cb();
};

function expect(operand) {
  return EQUALITY_OPS.toEqual(operand);
};

describe('Battleship test suite:', () => {
  test('  board dimensions ', () => {
    const { width, height } = ai.getBoardDimensions();
    // expect(width).toEqual(10);

  })
});