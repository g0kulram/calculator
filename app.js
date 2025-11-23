const display = document.querySelector('.display');
const keypad = document.querySelector('.keypad');

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
            return add(left, right);

        case '-':
            return subtract(left, right);

        case '*':
            return multiply(left, right);

        case '/':
            return divide(left, right);

        default:
            break;
    }
}

function displayNumber(num) {
    tempNumber = num;
    display.textContent = tempNumber;
}

//handling button click event from keypad
let tempNumber = '';
keypad.addEventListener('click', (event) => {
    const element = event.target;

    if (element.classList.contains('digit')) {
        onDigitPressed(element.textContent);
    } else if (element.classList.contains('operator')) {
        console.log(`Operator ${operator} pressed!`);
        if (element.textContent === '=') {
            onEqualToPressed()
        } else {
            onOperatorClicked(element.textContent);
        }
    } else if (element.classList.contains('clear')) {
        onClearClicked();
    } else if (element.classList.contains('delete')) {
        onDeleteClicked();
    }
});

function round(num) {
    if (Number.isInteger(num)) {
        return Number.parseInt(num);
    } else {
        const newNum = num.toFixed(2);
        return (+newNum);
    }
}

function onDigitPressed(digit) {
    console.log(`Digit ${digit} pressed!`);
    if (digit === '.' && tempNumber.includes('.')) {
        return;
    }
    displayNumber(tempNumber + digit);
}

function onEqualToPressed() {
    if (operator != '=') {
        rightOperand = +tempNumber;
        //check for zero division
        if (operator === '/' && rightOperand === 0) {
            rightOperand = null;
            displayNumber('');
            alert('Trying to divide by zero? Not happening. Try another number');
            return;
        }
        leftOperand = round(operate(leftOperand, operator, rightOperand));
        displayNumber(String(leftOperand));
        operator = '=';
    }
}

function onOperatorClicked(operation) {
    if (leftOperand === null) {
        //if left is null, it means its the first ever entry of calculator
        //assign the leftOperand
        leftOperand = +tempNumber;
        //store the operator
        operator = operation;
        //empty the tempNumber
        tempNumber = '';
        //now calculator is ready to accept the right operand
    } else if (rightOperand === null) {
        //if right is null, it means left operand is available
        rightOperand = +tempNumber;
        //check for zero division
        if (operator === '/' && rightOperand === 0) {
            rightOperand = null;
            displayNumber('');
            alert('Trying to divide by zero? Not happening. Try another number');
            return;
        }
        //so perform the previously selected operation,
        //and store the value in leftOperand
        leftOperand = round(operate(leftOperand, operator, rightOperand));
        //and then assign operator its new operation
        operator = operation;
        //and finally null the right operand
        rightOperand = null;
        //now display the leftOperand
        displayNumber(String(leftOperand));
        tempNumber = '';
    } else {
        //control comes here after an 'equal to' operation
        //null the rightOperand to enable next operation
        rightOperand = null;
        //store the operator to perform
        operator = operation;
        //empty the tempNumber to accept the next number
        tempNumber = '';
    }
}

function onDeleteClicked() {
    console.log('Delete pressed!');
    if (tempNumber.length > 0) {
        leftOperand = tempNumber.slice(0, -1);
        displayNumber(leftOperand);
    }
}

function onClearClicked() {
    console.log('Clear pressed!');
    leftOperand = null;
    operator = null;
    rightOperand = null;
    displayNumber('');
}

//handling key press event
document.addEventListener('keydown', (event) => {
    console.log(`User pressed ${event.key}!`);
    const key = event.key;

    if ('0123456789.'.includes(key)) {
        onDigitPressed(key);
    } else if ('Enter='.includes(key)) {
        onEqualToPressed();
    } else if ('/*-+'.includes(key)) {
        onOperatorClicked(key);
    } else if ('Backspace' === key) {
        onDeleteClicked();
    } else if ('Delete' === key) {
        onClearClicked();
    }
})
