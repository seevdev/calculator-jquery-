'use strict';

$(() => {
  // Selectors
  const numbersBtnEls = $('[data-number]');
  const operationBtnEls = $('[data-operation]');
  const btnEqualEl = $('[data-equal]');
  const btnClearAllEl = $('[data-all-clear]');
  const btnDeleteEl = $('[data-delete]');
  const currentOperandEl = $('[data-current-operand]');
  const previousOperandEL = $('[data-previous-operand]');

  class Calculator {
    constructor(currentOperandEl, previousOperandEl) {
      this.currentOperandEl = currentOperandEl;
      this.previousOperandEl = previousOperandEl;
      this.string = '';
      this.clear();
    }

    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
    formatNumber(num) {
      const stringNum = num.toString();
      const [integerPart, decimalPart] = stringNum.split('.');
      let numberDisplay;
      if (Number.isNaN(integerPart)) {
        numberDisplay = '';
      } else {
        numberDisplay = integerPart.toLocaleString('en-US', {
          maximumFractionDigits: 0,
        });
      }
      if (decimalPart != null) {
        return `${numberDisplay}.${decimalPart}`;
      } else {
        return numberDisplay;
      }
    }

    delete() {
      if (this.currentOperand.length >= 1) {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
      }
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      if (Number.isNaN(prev) || isNaN(curr)) return;

      switch (this.operation) {
        case '+':
          computation = prev + curr;
          break;
        case '-':
          computation = prev - curr;
          break;
        case '×':
          computation = prev * curr;

          break;
        case '÷':
          computation = prev / curr;

          break;
        case '%':
          computation = this.currentOperand / 100;

          break;
      }

      this.currentOperand = computation;

      this.operation = undefined;
      this.previousOperand = '';
    }

    updateDisplay() {
      this.currentOperandEl.html(this.formatNumber(this.currentOperand));

      if (this.operation !== undefined) {
        this.previousOperandEl.html(
          `${this.formatNumber(this.previousOperand)} ${this.operation}`
        );
      } else {
        this.previousOperandEl.html('...');
      }
    }
  }

  const calculator = new Calculator(currentOperandEl, previousOperandEL);

  numbersBtnEls.on('click', function () {
    calculator.appendNumber(this.innerText);
    calculator.updateDisplay();
  });

  operationBtnEls.on('click', function () {
    calculator.chooseOperation(this.innerHTML);
    calculator.updateDisplay();
  });

  btnEqualEl.on('click', () => {
    calculator.compute();
    calculator.updateDisplay();
    calculator.previousOperand = calculator.currentOperand;
    calculator.currentOperand = '';
  });

  btnClearAllEl.on('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  btnDeleteEl.on('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });
});
