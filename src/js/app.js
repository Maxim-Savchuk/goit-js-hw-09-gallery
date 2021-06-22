import galleryItems from './app-items.js';

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const closeModalButton = document.querySelector('[data-action="close-lightbox"]');

let itemIdx = 0;

function createGalleryMarkup() {
  const markup = galleryItems.map(({ preview, original, description }, idx) => {
    return `
    <li
        class="galery__item"
        >
        <a
            class="gallery__link"
            href="${original}"
        >
        <img
            data-index="${idx}"
            class="gallery__image"
            src="${preview}"
            data-sourse="${original}"
            alt="${description}" >
        </a>
    </li>`;
  }).join('');

  return markup;
}

function replaceAttribute(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
}

function onOpenModal(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  itemIdx = Number(evt.target.dataset.index);

  const sourceEl = evt.target.dataset.sourse;
  const altEl = evt.target.alt;

  lightbox.classList.add('is-open');
  replaceAttribute(sourceEl, altEl);

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onSwipeKeyPress);
}

function onCloseModal() {
  lightbox.classList.remove('is-open');
  replaceAttribute("", "");

  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}
//Swipe
function increment() {
  if (itemIdx === galleryItems.length - 1) 
    return (itemIdx = 0);
  itemIdx++;
}

function decrement() {
  if (itemIdx === 0)
    return (itemIdx = galleryItems.length - 1);
  itemIdx--;
}

function onSwipeKeyPress(evt) {
  evt.code === 'ArrowLeft' && decrement();
  evt.code === 'ArrowRight' && increment();
  const { original, description } = galleryItems[itemIdx];
  replaceAttribute(original, description);
}

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend', galleryMarkup);

gallery.addEventListener('click', onOpenModal);
closeModalButton.addEventListener('click', onCloseModal);
lightboxOverlay.addEventListener('click', onOverlayClick);