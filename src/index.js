import './style.css';

const form = document.querySelector('form');

function isPatternMismatch(pattern, value) {
  return !pattern.test(value);
}

function isEmpty(value) {
  return !value;
}

function emailValidator() {
  const type = 'email';
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  function validate() {
    const input = form.querySelector('#email');
    const { value } = input;

    if (isEmpty(value)) {
      input.setCustomValidity('You need to enter an email address.');
      return false;
    }

    if (isPatternMismatch(regex, value)) {
      input.setCustomValidity('You need to enter a valid email.');
      return false;
    }

    input.setCustomValidity('');
    return true;
  }

  return {
    type,
    validate,
  };
}

function countryValidator() {
  const type = 'country';

  function validate() {
    const input = form.querySelector('#country');
    const { value } = input;

    if (isEmpty(value)) {
      input.setCustomValidity('You need to select a country.');
      return false;
    }

    input.setCustomValidity('');
    return true;
  }

  return {
    type,
    validate,
  };
}

const inputValidators = [emailValidator(), countryValidator()];

function checkValidity(e) {
  if (e.target.tagName === 'INPUT') {
    const inputType = e.target.name;
    const targetValidator = inputValidators.find(
      (input) => input.type === inputType,
    );
    targetValidator.validate();
  } else {
    inputValidators.forEach((input) => {
      input.validate();
    });
  }
}

window.addEventListener('load', checkValidity);
form.addEventListener('input', checkValidity);
form.addEventListener('submit', checkValidity);
