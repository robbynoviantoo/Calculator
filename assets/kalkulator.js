const calculator = {
	displayNumber: '0',
	operator: null,
	firstNumber: null,
	waitingForSecondNumber: false,
}

function updateDisplay() {
	document.querySelector('#displayNumber').innerText =
		calculator.displayNumber
}

function clearCalculator() {
	calculator.displayNumber = '0'
	calculator.operator = null
	calculator.firstNumber = null
	calculator.waitingForSecondNumber = false
}

function doneCalculator() {
	calculator.firstNumber = calculator.displayNumber
	calculator.operator = null
	calculator.waitingForSecondNumber = false
}

function inputDigit(digit) {
	if (calculator.displayNumber === '0') {
		calculator.displayNumber = digit
	} else {
		calculator.displayNumber += digit
	}
}

function handleOperator(operator) {
	if (!calculator.waitingForSecondNumber) {
		calculator.operator = operator
		calculator.waitingForSecondNumber = true
		calculator.firstNumber = calculator.displayNumber
		calculator.displayNumber = '0'
	} else {
		alert('Operator sudah ditetapkan')
	}
}

function performCalculation() {
	if (calculator.firstNumber == null || calculator.operator == null) {
		alert('Anda belum menetapkan operator')
		return
	}


	let result = 0
	if (calculator.operator === '+') {
		result =
			parseFloat(calculator.firstNumber) +
			parseFloat(calculator.displayNumber)
	} else if(calculator.operator === '-') {
		result =
			parseFloat(calculator.firstNumber) -
			parseFloat(calculator.displayNumber)
	} else if(calculator.operator === 'x'){
		result =
			parseFloat(calculator.firstNumber) *
			parseFloat(calculator.displayNumber)
	} else if(calculator.operator === '/'){
		result =
			parseFloat(calculator.firstNumber) /
			parseFloat(calculator.displayNumber)
	} else if(calculator.operator === '%') {
		result =
			parseFloat(calculator.firstNumber) / 100;
	}

	// objek yang akan dikirimkan sebagai argumen fungsi putHistory()
	calculator.displayNumber = result
}

const buttons = document.querySelectorAll('.button')


for (let button of buttons) {
	button.addEventListener('click', function (event) {
		const target = event.target

		if (target.classList.contains('clear')) {
			clearCalculator()
			updateDisplay()
			return
		}

		if (target.classList.contains('negative')) {
			inverseNumber()
			updateDisplay()
			return
		}

		if (target.classList.contains('equals')) {
			performCalculation()
			updateDisplay()
			doneCalculator()
			return
		}

		if (target.classList.contains('operator')) {
			handleOperator(target.innerText)
			return
		}

		if (target.classList.contains('percent')) {
			handleOperator(target.innerText)
			performCalculation()
			updateDisplay()
			doneCalculator()
			return
		}

		inputDigit(target.innerText)
		updateDisplay()
	})
}
