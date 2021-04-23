const forms = document.querySelectorAll('.js-form');
const inputs = document.querySelectorAll('.message__input');

function validateForm(form) {
   const name = form.querySelector('.message__input--name');
   const email = form.querySelector('.message__input--email');
   const message = form.querySelector('.message__input--message');

   let err = 0;
   if (name.value == '') {
      err++;
      name.classList.add('message__input--error');
   } else {
      name.classList.remove('message__input--error');
   }
   if (email.value == '' || email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1) {
      err++;
      email.classList.add('message__input--error');
      email.value = 'Please enter a valid email address'
   } else {
      email.classList.remove('message__input--error');
   }
   if (message.value == '') {
      err++;
      message.classList.add('message__input--error');
   } else {
      message.classList.remove('message__input--error');
   }

   return err;
}

function sendForm(event) {
   event.preventDefault();

   let error = validateForm(event.target);

   if (error == 0) {
      let request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

      let formData = new FormData;
      let obj = {};
      formData.forEach(function (value, key) {
         obj[key] = value;
      });

      let json = JSON.stringify(obj);

      request.send(json);

      request.addEventListener('readystatechange', function () {
         if (request.readyState == 4 && request.status == 200) {
            clearForm(event);
            if (event.target.classList.contains('modal__message')) {
               showPupap();
            } else if (event.target.classList.contains('message')) {
               showSuccess();
            }
         }
      });

   }
}
function clearForm(event) {
   let inputs = event.target.querySelectorAll('.message__input');
   inputs.forEach((elem) => {
      elem.value = '';
   });
}

function clearError(event) {
   let input = event.target
   if (input.classList.contains('message__input--error')) {
      input.value = '';
      input.classList.remove('message__input--error');
   }

}
function showPupap() {
   document.querySelector('.modal--active').classList.remove('modal--active');
   document.querySelector('.js-modal__success').classList.add('modal--active');

   setTimeout(() => {
      document.querySelector('.modal--active').classList.remove('modal--active');
      document.body.style.paddingRight = `0`;
      document.body.style.overflow = 'initial';
   }, 3000);
}

function showSuccess() {
   let messageSuccess = document.querySelector('.modal__message--success');
   messageSuccess.classList.remove('hidde');

   setTimeout(() => messageSuccess.classList.add('hidde'), 2000);
}

forms.forEach(function (form) {
   form.addEventListener('submit', sendForm);
});


inputs.forEach(function (element) {
   element.addEventListener('focus', clearError);
});