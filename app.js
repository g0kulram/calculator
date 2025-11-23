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
    //check if left operand is null, if so assign the value to it
    //if the left operand is not null, check if right operand is null
    //if right operand is null, assign the value to it
    //if right operand is not null, operate
    if (element.classList.contains('digit')) {
        console.log(`Digit ${element.textContent} pressed!`);
        tempNumber += element.textContent;
        displayNumber(tempNumber);
    } else if (element.classList.contains('operator')) {
        console.log(`Operator ${operator} pressed!`);
        if (element.textContent === '=') {
            rightOperand = +tempNumber;
            leftOperand = operate(leftOperand, operator, rightOperand);
            displayNumber(leftOperand);
        } else {
            if (leftOperand === null) { //if left is null, it means its the first entry
                leftOperand = +tempNumber;
                operator = element.textContent;
                tempNumber = '';
                //now calculator is ready to accept the right operand
            } else if (rightOperand === null) {
                //if right is null, it means left operand is available
                rightOperand = +tempNumber;
                //so perform the previously selected operation,
                //and store the value in leftOperand
                leftOperand = operate(leftOperand, operator, rightOperand);
                //and then assign operator its new operation
                operator = element.textContent;
                //and finally null the right operand
                rightOperand = null;
                //now display the leftOperand
                displayNumber(leftOperand);
                tempNumber = '';
            } else {
                console.log('Else of the else block');
            }
        }
    } else if (element.classList.contains('clear')) {
        console.log('Clear pressed!');
        leftOperand = null;
        operator = null;
        rightOperand = null;
        tempNumber = '';
        displayNumber(tempNumber);
    }
});
