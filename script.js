'use strict';

const bill = document.getElementById('bill-input');
const numberOfPerson = document.getElementById('person-input');
const tipPerPerson = document.querySelector('.tip-per-person');
const totalPerson = document.querySelector('.total-per-person');
const reset = document.querySelector('.reset');
const tips = document.querySelectorAll('.tip');
const tip5 = document.querySelector('.tip--5');
const tip10 = document.querySelector('.tip--10');
const tip15 = document.querySelector('.tip--15');
const tip25 = document.querySelector('.tip--25');
const tip50 = document.querySelector('.tip--50');
const custom = document.getElementById('custombox');
const error = document.querySelector('.hidden');
const borderInput = document.querySelector('.Person');
// selectTipsBtn.forEach(btn => {
//   btn.addEventListener('click', event => {
//     selectTipsBtn.forEach(tipsBtn => {
//       tipsBtn.classList.remove('active');
//     });
//     event.target.classList.add('active');
//   });
// });
let tipValue = 0.15;
tips.forEach(function (val) {
  val.addEventListener('click', handleclick);
});
function handleclick(event) {
  tips.forEach(val => {
    // console.log(val.innerHTML);
    // console.log(event.target.innerHTML);
    val.classList.remove('active');
    if (event.target.innerHTML === val.innerHTML) {
      val.classList.add('active');
      tipValue = parseFloat(val.innerHTML) / 100;
      calculateTip();
    }
  });
}

bill.addEventListener('input', billInput);
numberOfPerson.addEventListener('input', peopleInput);

bill.value = '0.00';
numberOfPerson.value = '1';
tipPerPerson.innerHTML = '$' + (0.0).toFixed(2);
totalPerson.innerHTML = '$' + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;

function billInput() {
  billValue = parseFloat(bill.value);
  calculateTip();
}
function peopleInput() {
  peopleValue = parseFloat(numberOfPerson.value);
  calculateTip();

  if (peopleValue < 1) {
    error.style.display = 'flex';
    borderInput.style.border = 'thick solid red';
  } else {
    error.style.display = 'none';
    borderInput.style.border = 'none';
    calculateTip();
  }
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (bill.value * tipValue) / peopleValue;
    let total = (bill.value * tipAmount) / peopleValue;
    tipPerPerson.innerHTML = '$' + tipAmount.toFixed(2);
    totalPerson.innerHTML = '$' + total.toFixed(2);
  }
}

custom.addEventListener('input', customInput);
function customInput() {
  tipValue = parseFloat(custom.value) / 100;
  tips.forEach(val => val.classList.remove('active'));
  calculateTip();
}

reset.addEventListener('click', function () {
  bill.value = '0.00';
  billInput();
  numberOfPerson.value = '1';
  peopleInput();
  tipPerPerson.innerHTML = '$' + (0.0).toFixed(2);
  totalPerson.innerHTML = '$' + (0.0).toFixed(2);
  custom.value = '';
});
