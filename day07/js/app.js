'use strict';

const numA = document.querySelector('#numA');
const numB = document.querySelector('#numB');
const errorA = document.querySelector('#errorA');
const errorB = document.querySelector('#errorB');
const operatorBtns = document.querySelectorAll('.operator-btn');
const calculateBtn = document.querySelector('#calculateBtn');
const resultValue = document.querySelector('#resultValue');

let selectedOperator = null;

// 연산자 선택
operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    operatorBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedOperator = btn.dataset.op;
  });
});

// 숫자 입력 유효성: 숫자가 아닌 문자 입력 차단
function validateNumberInput(input, errorEl) {
  const value = input.value.trim();

  if (value === '' || value === '-') {
    errorEl.textContent = '숫자를 입력해주세요.';
    input.classList.add('error');
    return false;
  }

  if (isNaN(Number(value))) {
    errorEl.textContent = '올바른 숫자 형식이 아닙니다.';
    input.classList.add('error');
    return false;
  }

  errorEl.textContent = '';
  input.classList.remove('error');
  return true;
}

// 실시간 유효성 표시
numA.addEventListener('input', () => validateNumberInput(numA, errorA));
numB.addEventListener('input', () => validateNumberInput(numB, errorB));

// 계산
calculateBtn.addEventListener('click', () => {
  const validA = validateNumberInput(numA, errorA);
  const validB = validateNumberInput(numB, errorB);

  if (!validA || !validB) {
    showResult('입력값을 확인해주세요.', true);
    return;
  }

  if (!selectedOperator) {
    showResult('연산자를 선택해주세요.', true);
    return;
  }

  const a = Number(numA.value.trim());
  const b = Number(numB.value.trim());
  let result;

  switch (selectedOperator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) {
        showResult('0으로 나눌 수 없습니다.', true);
        return;
      }
      result = a / b;
      break;
    default:
      showResult('알 수 없는 연산자입니다.', true);
      return;
  }

  // 소수점 2자리까지 표시 (불필요한 0 제거)
  const formatted = parseFloat(result.toFixed(2));
  showResult(`${a} ${selectedOperator} ${b} = ${formatted}`, false);
});

function showResult(text, isError) {
  resultValue.textContent = text;
  if (isError) {
    resultValue.classList.add('error-msg');
  } else {
    resultValue.classList.remove('error-msg');
  }
}
