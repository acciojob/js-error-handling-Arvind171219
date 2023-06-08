//your code here
class OutOfRangeError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'Expression should only consist of integers and +-/* characters and not <arg>';
  }
}

class InvalidExprError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'Expression should not have an invalid combination of expression';
  }
}

function evalString(expression) {
  try {
    if (/[\+\-\*\/]{2,}/.test(expression)) {
      throw new InvalidExprError();
    }

    if (/^[\+\*\/]/.test(expression)) {
      throw new SyntaxError('Expression should not start with invalid operator');
    }

    if (/[\+\*\/\-]$/.test(expression)) {
      throw new SyntaxError('Expression should not end with invalid operator');
    }

    // Evaluation logic for the expression goes here
    const result = eval(expression);
    return result;
  } catch (error) {
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
      throw error;
    } else {
      throw new OutOfRangeError();
    }
  }
}

// Test case
try {
  const expression = '5 + 3 * 2';
  const result = evalString(expression);
  console.log(result);
} catch (error) {
  console.log(error.name + ': ' + error.message);
}
