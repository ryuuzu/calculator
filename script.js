function operate(operator, num1, num2) {
	let result;
	switch (operator) {
		case "+":
			result = num1 + num2;
			break;
		case "-":
			result = num1 - num2;
			break;
		case "*":
			result = num1 * num2;
			break;
		case "/":
			result = num1 / num2;
			break;
		case "pow":
			result = num1 ** num2;
			break;
		default:
			result = NaN;
			break;
	}
	return result;
}

let inputDisplay = document.querySelector("#input-display");
let inputHistory = document.querySelector("#input-history");

let firstArg, secondArg, operator, operation_symbol;
let continue_operation = false;

let numberButtons = document.querySelectorAll(".number-button");
let operationButtons = document.querySelectorAll(".operation-button");

function resetAllValues() {
	firstArg = undefined;
	secondArg = undefined;
	operator = undefined;
	operation_symbol = undefined;
	continue_operation = false;
}

function resetAllInputs() {
	inputHistory.value = "";
	inputDisplay.value = "0";
}

function addToInputHistory(to_add) {
	if (inputHistory.value === "") {
		inputHistory.value = to_add;
	} else {
		inputHistory.value += " " + to_add;
	}
}

function resetInputHistory() {
	inputHistory.value = "";
}

function clearInputDisplay() {
	inputDisplay.value = "";
}

numberButtons.forEach((numberButton) => {
	numberButton.addEventListener("click", () => {
		if (inputDisplay.value === "0" && numberButton.value !== ".") {
			inputDisplay.value = numberButton.value;
		} else if (
			secondArg === undefined &&
			firstArg !== undefined &&
			continue_operation
		) {
			resetInputHistory();
			addToInputHistory(firstArg);
			addToInputHistory(operation_symbol);
			clearInputDisplay();
			inputDisplay.value = numberButton.value;
			continue_operation = false;
		} else {
			inputDisplay.value += numberButton.value;
		}
	});
});

operationButtons.forEach((operationButton) => {
	operationButton.addEventListener("click", () => {
		operation_symbol = operationButton.textContent;
		if (inputDisplay.value === "0") {
			return;
		} else if (firstArg === undefined) {
			resetInputHistory();
			firstArg = Number.parseFloat(inputDisplay.value);
			addToInputHistory(firstArg);
			operator = operationButton.value;
			clearInputDisplay();
			addToInputHistory(operation_symbol);
			continue_operation = false;
		} else {
			secondArg = Number.parseFloat(inputDisplay.value);
			addToInputHistory(secondArg);
			inputDisplay.value = operate(operator, firstArg, secondArg);
			firstArg = Number.parseFloat(inputDisplay.value);
			operator = operationButton.value;
			secondArg = undefined;
			continue_operation = true;
		}
	});
});

document.querySelector(".operate-button").addEventListener("click", () => {
	if (operator === undefined || firstArg === undefined) {
		console.log("going here");
		return;
	}
	secondArg = Number.parseFloat(inputDisplay.value);
	addToInputHistory(secondArg);
	inputDisplay.value = operate(operator, firstArg, secondArg);
	resetAllValues();
});

document.querySelector(".clear-button").addEventListener("click", () => {
	if (inputDisplay.value.length < 0 || inputDisplay.value === "0") {
		return;
	}
	inputDisplay.value = inputDisplay.value.slice(
		0,
		inputDisplay.value.length - 1
	);
});
