import './style.css';

const countries = require('./country-list.json');

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

  function hasCountry(value) {
    const countriesName = countries.map((country) => country.name);
    return countriesName.includes(value);
  }

  function validate() {
    const input = form.querySelector('#country');
    const { value } = input;

    if (isEmpty(value)) {
      input.setCustomValidity('You need to select a country.');
      return false;
    }

    if (!hasCountry(value)) {
      input.setCustomValidity('You need to enter a valid country.');
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

function zipcodeValidator() {
  const type = 'zipcode';
  const regex = /^[a-zA-Z0-9]{3,5}([-\s]?[a-zA-Z0-9]{3,5})?$/;

  function validate() {
    const input = form.querySelector('#zipcode');
    const { value } = input;

    if (isEmpty(value)) {
      input.setCustomValidity('You need to select a zip code.');
      return false;
    }

    if (isPatternMismatch(regex, value)) {
      input.setCustomValidity('You need to enter a valid zip code.');
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

const inputValidators = [
  emailValidator(),
  countryValidator(),
  zipcodeValidator(),
];

function checkValidity(e) {
  if (e.target.tagName === 'INPUT') {
    const inputType = e.target.name;
    const targetValidator = inputValidators.find(
      (input) => input.type === inputType,
    );
    const isValid = targetValidator.validate();
    if (!isValid) {
      e.target.reportValidity();
    }
  } else {
    inputValidators.forEach((input) => {
      input.validate();
    });
  }
}

window.addEventListener('load', checkValidity);
form.addEventListener('input', checkValidity);
form.addEventListener('submit', checkValidity);
