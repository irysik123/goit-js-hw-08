// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');

const markup = (array) => 
    array.map(({ original, preview, description }) => {
        return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
           <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
     </li>`
    }).join('');

const galleryCards = markup(galleryItems);

/* galleryEl.innerHTML = galleryCards;
 */

galleryEl.insertAdjacentHTML('afterbegin', galleryCards);

const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt",  captionDelay: 250 });
