import { Notify } from "notiflix";
export { notifyFillInFieldWarning, notifyNoImagesWarning, notifyEndOfGalleryInfo, notifyTotalHitsImagesSuccess };

function notifyFillInFieldWarning() {
	Notify.warning(
		"Please fill in the search field.",
		{
		width: '400px',
		fontSize: '26px',
		position: 'center-center',
	});
};

function notifyNoImagesWarning() {
	Notify.warning(
		"Sorry, there are no images matching your search query. Please try again.",
		{
		width: '700px',
		fontSize: '26px',
		position: 'center-center',
	});
};

function notifyEndOfGalleryInfo() {
	Notify.info(
		"We're sorry, but you've reached the end of search results.",
		{
		width: '750px',
		fontSize: '26px',
		position: 'center-center',
	});
};

function notifyTotalHitsImagesSuccess(totalHits) {
	Notify.success(`Hooray! We found ${totalHits} images."`,
	{
		width: '350px',
		fontSize: '18px',
		position: 'right-top',
	});
};
