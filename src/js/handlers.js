import { serviceImages } from "./img-api";
import { refs } from "./refs";
import {
	notifyEndOfGalleryInfo, notifyFillInFieldWarning,
	notifyNoImagesWarning, notifyTotalHitsImagesSuccess
} from "./notifications";
import { scrollToTop } from "./scroll-up";
import { galleryLightbox } from "./simple-lightbox";

export { onFormSubmit, onbtnLoadMoreClick };

function createMarkup(arr) {
	return arr.map(
		({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
			`<div class="photo-card">
			<a class="gallery-link" href="${largeImageURL}">
  		<img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  	<div class="gallery-info">
    	<p class="info-item">
      <b>Likes</b><br/>${likes}
    	</p>
    	<p class="info-item">
      <b>Views</b><br/>${views}
    	</p>
    	<p class="info-item">
      <b>Comments</b><br/>${comments}
    	</p>
    	<p class="info-item">
      <b>Downloads</b><br/>${downloads}
    	</p>
  	</div>
		</a>
		</div>`
		).join('');
}

const refs = {
	form: document.querySelector('#search-form'),
	btnSearch: document.querySelector('.js-btn-search'),
	gallery: document.querySelector('.gallery'),
	btnLoadMore: document.querySelector('.load-more'),
};

let searchQuery = '';
let page = 1;


async function onFormSubmit(evt) {
	evt.preventDefault();
	searchQuery = evt.currentTarget.searchQuery.value.trim();
	if (!searchQuery) {
		notifyFillInFieldWarning();
		return;
	};
	page = 1;
	try {
		const{ hits, totalHits } = await serviceImages(searchQuery, page);
		if (hits.length === 0) {
			refs.btnLoadMore.classList.add('is-hidden');
			refs.gallery.innerHTML = '';
			notifyNoImagesWarning();
			return;
		}
		scrollToTop();
		refs.gallery.innerHTML = createMarkup(hits);
		galleryLightbox.refresh();
		notifyTotalHitsImagesSuccess(totalHits);
		if (Math.ceil(totalHits / 40) === page) {
			refs.btnLoadMore.classList.add('is-hidden');
			notifyEndOfGalleryInfo();
			return;
		};
		refs.btnLoadMore.classList.remove('is-hidden');
	} catch (err) {
    console.log(err);
	};
};

async function onbtnLoadMoreClick() {
	refs.btnLoadMore.classList.add('is-hidden');
	page += 1;
	try {
		const { hits, totalHits } = await serviceImages(searchQuery, page);
		if (hits.length === 0) {
			notifyNoImagesWarning();
			return;
		}
		refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
		galleryLightbox.refresh();
		 if(Math.ceil(totalHits / 40) === page){
			notifyEndOfGalleryInfo();
			return;
		};
		refs.btnLoadMore.classList.remove('is-hidden');
		const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
		window.scrollBy({
			top: cardHeight * 2,
			behavior: "smooth",
		});
	} catch (err) {
    console.log(err);
	}
};