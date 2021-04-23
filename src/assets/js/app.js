const button = document.querySelector('.ask__btn');
const modal = document.querySelector('.js-modal');
const close = document.querySelector('.js-message__close');
const form = document.querySelector('.modal__message');

function openPopup(event) {
   event.preventDefault();
   modal.classList.add('modal--active');
   
   const name = form.querySelector('.message__input--name');
   const email = form.querySelector('.message__input--email');
   const message = form.querySelector('.message__input--message');
   
   name.value = '';
   name.classList.remove('message__input--error');
   email.value = '';
   email.classList.remove('message__input--error');
   message.value = '';
   message.classList.remove('message__input--error');

   document.body.style.paddingRight = `${getScrolbarWidth()}px`;
   document.body.style.overflow = 'hidden';
}

function closePopup(event) {
   event.preventDefault();
   modal.classList.remove('modal--active');
   document.body.style.paddingRight = `0`;
   document.body.style.overflow = 'initial';
}

const getScrolbarWidth = () => {
   const item = document.createElement('div');
   item.style.position = 'absolute';
   item.style.top = '-9999px';
   item.style.width = '50px';
   item.style.height = '50px';
   item.style.overflow = 'scroll';
   item.style.visibility = 'hidden'

   document.body.appendChild(item);
   const scrollBarWidth = item.offsetWidth - item.clientWidth;
   document.body.removeChild(item);

   return scrollBarWidth;
}


button.addEventListener('click', openPopup);

close.addEventListener('click', closePopup);

modal.addEventListener('click', closePopup);

form.addEventListener('click', (event) => {
   event.stopPropagation();
});




