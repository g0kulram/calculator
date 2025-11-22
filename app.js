function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

let leftOperand = null;
let operator = null;
let rightOperand = null;

function operate(left, operation, right) {
    switch (operation) {
        case '+':
            add(left, right);
            break;

        case '-':
            subtract(left, right);
            break;

        case '*':
            multiply(left, right);
            break;

        case '/':
            divide(left, right);
            break;

        default:
            break;
    }
}
