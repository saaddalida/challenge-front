function checkInputValue() {
  let amount = document.getElementById('sale-amount').value;
  let installments = document.getElementById('sale-installments').value;
  let mdr = document.getElementById('sale-mdr').value;

  if (installments > 12) {
    return alert('O número de parcelas não pode exceder 12');
  }
  if (amount && installments && mdr) {
    calculateOutput(amount, installments, mdr);
  }
}

function calculateOutput(amount, installments, mdr) {
  const rate = 1.92;
  let ninetiethDayValue = amount * (1 - mdr / 100);
  let portion = ninetiethDayValue / installments;
  let anticipateThirty = portion - rate;
  let anticipateFifteen = anticipateThirty - rate / 2;
  let anticipateSixty = portion - rate * 2;
  let anticipateNinety = portion - rate * 3;
  let thirtiethDayValue = portion + anticipateThirty + anticipateSixty;
  let fifteenthDayValue =
    anticipateFifteen + anticipateThirty + anticipateSixty;
  let tomorrowValue = anticipateThirty + anticipateSixty + anticipateNinety;

  changeOutputValue('tomorrow-value', tomorrowValue);
  changeOutputValue('fifteenth-value', fifteenthDayValue);
  changeOutputValue('thirtieth-value', thirtiethDayValue);
  changeOutputValue('ninetieth-value', ninetiethDayValue);
}

function changeOutputValue(id, value) {
  document.getElementById(id).innerHTML = `R$ ${value
    .toFixed(2)
    .toString()
    .replace('.', ',')}`;
}

const inputs = document.querySelectorAll('input');

inputs.forEach(input =>
  input.addEventListener('keyup', () => {
    if (inputs.length > 0) {
      checkInputValue();
    }
  })
);
