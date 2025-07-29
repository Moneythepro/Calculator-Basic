const display = document.getElementById("display");
const result = document.getElementById("result");

let expression = '';

function updateDisplay() {
  display.value = expression;
  try {
    // Show live result
    const evalResult = Function('"use strict"; return (' + expression + ')')();
    result.textContent = isFinite(evalResult) ? evalResult : '';
  } catch {
    result.textContent = '';
  }
}

function append(val) {
  if (val === '.' && /[^\d.]$|\.\d*$/.test(expression)) return; // Prevent multiple dots
  if (/^0\d/.test(expression)) expression = expression.replace(/^0+/, ''); // Prevent leading zero
  expression += val;
  updateDisplay();
}

function addOperator(op) {
  if (expression === '') return;
  const lastChar = expression.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    expression = expression.slice(0, -1); // Replace last operator
  }
  expression += op;
  updateDisplay();
}

function clearAll() {
  expression = '';
  updateDisplay();
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const finalResult = Function('"use strict"; return (' + expression + ')')();
    expression = String(finalResult);
    updateDisplay();
  } catch {
    expression = '';
    display.value = 'Error';
    result.textContent = '';
  }
}
