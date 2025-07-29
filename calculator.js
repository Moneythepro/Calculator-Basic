const display = document.getElementById("display");
const result = document.getElementById("result");

let expression = '';

function updateDisplay() {
  display.value = expression;
  try {
    const evalResult = Function('"use strict"; return (' + expression + ')')();
    result.textContent = isFinite(evalResult) ? evalResult : '';
  } catch {
    result.textContent = '';
  }
}

function append(val) {
  const lastSegment = expression.split(/[\+\-\*\/%]/).pop();

  if (val === '.' && lastSegment.includes('.')) return;
  if (val === '0' && expression === '0') return;
  if ('123456789'.includes(val) && expression === '0') expression = '';
  
  expression += val;
  updateDisplay();
}

function addOperator(op) {
  if (expression === '' && op !== '-') return;

  const lastChar = expression.slice(-1);
  if ('+-*/%'.includes(lastChar)) {
    expression = expression.slice(0, -1);
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
    setTimeout(() => {
      display.value = '';
    }, 1200); // Slightly faster reset
  }
}
