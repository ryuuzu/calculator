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
