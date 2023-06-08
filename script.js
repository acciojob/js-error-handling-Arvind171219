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
      throw new SyntaxError('Expression should not start with an invalid operator');
    }

    if (/[\+\*\/\-]$/.test(expression)) {
      throw new SyntaxError('Expression should not end with an invalid operator');
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

// Example usage with user input
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the expression: ', (expression) => {
  try {
    const result = evalString(expression);
    console.log('Result:', result);
  } catch (error) {
    console.log(error.name + ': ' + error.message);
  }

  rl.close();
});
