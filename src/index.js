import { onFormSubmit, onbtnLoadMoreClick } from "./js/handlers";
import { refs } from "./js/refs";

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onbtnLoadMoreClick);
