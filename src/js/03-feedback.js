/* import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', onTextareaInput);

populateTextarea ();

function onFormSubmit(evt) {
    evt.preventDefault();

    evt.currentTarget.reset();
}

function onTextareaInput(event) {
  const message = event.currentTarget.value;

  localStorage.setItem('feedback-message', message);
}

function populateTextarea(){
    const savedMessage = localStorage.getItem('feedback-message');

    if (savedMessage) {
        refs.textarea.value = savedMessage;
    }

}  */

import throttle from 'lodash.throttle';

import localStorageApi from './localStorageAPI';

const refs = {
  formEl: document.querySelector('form'),
};

let formData = {};

const LOCAL_KEY = 'feedback-form-state';

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onTextInput, 500));

function onFormSubmit(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorageApi.remove(LOCAL_KEY);
  formData = {};
}

function onTextInput(event) {
  formData[event.target.name] = event.target.value;
  localStorageApi.save(LOCAL_KEY, formData);
}

function renderPage() {
  const savedData = localStorageApi.load(LOCAL_KEY);
  if(!savedData) {
    return
  }
  const entries = Object.entries(savedData);
  entries.forEach(el => {
    const [key, value] = el;
    refs.formEl[key].value = value;
  });
}

renderPage();
