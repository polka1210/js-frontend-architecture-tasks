import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = document.querySelector('[data-form="sign-up"]');
  const nameInput = document.querySelector('#sign-up-name');
  const emailInput = document.querySelector('#sign-up-email');
  const passwordInput = document.querySelector('#sign-up-password');
  const confirmInput = document.querySelector('#sign-up-password-confirmation');
  const submitBtn = document.querySelector('input[type="submit"]');
  
  let state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    isValid: false
  };
  
  function validateForm() {
    const fields = {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    };
    
    const errors = validate(fields);
    state.errors = errors;
    state.isValid = isEmpty(errors);
    
    if (state.isValid) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
    
    if (errors.email) {
      emailInput.classList.add('is-invalid');
      let feedback = emailInput.nextElementSibling;
      if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        emailInput.parentNode.appendChild(feedback);
      }
      feedback.textContent = errors.email.message;
    } else {
      emailInput.classList.remove('is-invalid');
      const feedback = emailInput.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
      }
    }
    
    if (errors.password) {
      passwordInput.classList.add('is-invalid');
      let feedback = passwordInput.nextElementSibling;
      if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        passwordInput.parentNode.appendChild(feedback);
      }
      feedback.textContent = errors.password.message;
    } else {
      passwordInput.classList.remove('is-invalid');
      const feedback = passwordInput.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
      }
    }
    
    if (errors.passwordConfirmation) {
      confirmInput.classList.add('is-invalid');
      let feedback = confirmInput.nextElementSibling;
      if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        confirmInput.parentNode.appendChild(feedback);
      }
      feedback.textContent = errors.passwordConfirmation.message;
    } else {
      confirmInput.classList.remove('is-invalid');
      const feedback = confirmInput.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
      }
    }
    
    if (errors.name) {
      nameInput.classList.add('is-invalid');
      let feedback = nameInput.nextElementSibling;
      if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        nameInput.parentNode.appendChild(feedback);
      }
      feedback.textContent = errors.name.message;
    } else {
      nameInput.classList.remove('is-invalid');
      const feedback = nameInput.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
      }
    }
  }
  
  nameInput.oninput = function(e) {
    state.name = e.target.value;
    validateForm();
  };
  
  emailInput.oninput = function(e) {
    state.email = e.target.value;
    validateForm();
  };
  
  passwordInput.oninput = function(e) {
    state.password = e.target.value;
    validateForm();
  };
  
  confirmInput.oninput = function(e) {
    state.passwordConfirmation = e.target.value;
    validateForm();
  };
  
  form.onsubmit = async function(e) {
    e.preventDefault();
    
    if (!state.isValid) {
      return;
    }
    
    submitBtn.disabled = true;
    
    try {
      await axios.post(routes.usersPath(), {
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      });
      
      container.innerHTML = 'User Created!';
    } catch (error) {
      submitBtn.disabled = false;
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'alert alert-danger';
      errorDiv.textContent = errorMessages.network.error;
      
      const existingError = container.querySelector('.alert-danger');
      if (existingError) {
        existingError.remove();
      }
      
      form.insertBefore(errorDiv, form.firstChild);
    }
  };
  
  validateForm();
};
// END
