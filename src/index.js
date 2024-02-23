import './style.css';

const form = document.querySelector('form');

function isPatternMismatch(pattern, value) {
  return !pattern.test(value);
}

function emailValidator() {
  const type = 'email';
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  function validate() {
    const { value } = form.querySelector('#email');
    if (isPatternMismatch(regex, value)) {
      console.log('pattern mismatch');
    }
  }

  return {
    type,
    validate,
  };
}

const inputValidators = [emailValidator()];

function checkValidity(e) {
  const inputType = e.target.name;
  const inputValue = e.target.value;

  const targetValidator = inputValidators.find(
    (input) => input.type === inputType,
  );
  targetValidator.validate(inputValue);
}

form.addEventListener('input', checkValidity);
