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
    display.textContent = num
}

let tempNumber = '';
keypad.addEventListener('click', (event) => {
    const element = event.target;

    if (element.classList.contains('digit')) {
        console.log(`Digit ${element.textContent} pressed!`);
        if (element.textContent === '.' && tempNumber.includes('.')) {
            return;
        }
        tempNumber += element.textContent;
            displayNumber(tempNumber);
    } else if (element.classList.contains('operator')) {
        console.log(`Operator ${operator} pressed!`);
        if (element.textContent === '=') {
            if (operator != '=') {
                rightOperand = +tempNumber;
                //check for zero division
                if (operator === '/' && rightOperand === 0) {
                    rightOperand = null;
                    tempNumber = '';
                    displayNumber(tempNumber);
                    alert('Trying to divide by zero? Not happening. Try another number');
                    return;
                }
                leftOperand = round(operate(leftOperand, operator, rightOperand));
                tempNumber = String(leftOperand);
                displayNumber(tempNumber);
                operator = '=';
            }
        } else {
            if (leftOperand === null) {
                //if left is null, it means its the first ever entry of calculator
                //assign the leftOperand
                leftOperand = +tempNumber;
                //store the operator
                operator = element.textContent;
                //empty the tempNumber
                tempNumber = '';
                //now calculator is ready to accept the right operand
            } else if (rightOperand === null) {
                //if right is null, it means left operand is available
                rightOperand = +tempNumber;
                //check for zero division
                if (operator === '/' && rightOperand === 0) {
                    rightOperand = null;
                    tempNumber = '';
                    displayNumber(tempNumber);
                    alert('Trying to divide by zero? Not happening. Try another number');
                    return;
                }
                //so perform the previously selected operation,
                //and store the value in leftOperand
                leftOperand = round(operate(leftOperand, operator, rightOperand));
                //and then assign operator its new operation
                operator = element.textContent;
                //and finally null the right operand
                rightOperand = null;
                //now display the leftOperand
                tempNumber = String(leftOperand);
                displayNumber(tempNumber);
                tempNumber = '';
            } else {
                //control comes here after an 'equal to' operation
                //null the rightOperand to enable next operation
                rightOperand = null;
                //store the operator to perform
                operator = element.textContent;
                //empty the tempNumber to accept the next number
                tempNumber = '';
            }
        }
    } else if (element.classList.contains('clear')) {
        console.log('Clear pressed!');
        leftOperand = null;
        operator = null;
        rightOperand = null;
        tempNumber = '';
        displayNumber(tempNumber);
    } else if (element.classList.contains('delete')) {
        console.log('Delete pressed!');
        if (tempNumber.length > 0) {
            tempNumber = tempNumber.slice(0, -1);
            displayNumber(tempNumber);
        }
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
