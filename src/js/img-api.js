import axios from "axios";
export { serviceImages };
axios.defaults.baseURL = "https://pixabay.com/api/";


async function serviceImages(searchQuery, page = 1) {
	const params = new URLSearchParams({
		key: '35665373-98cf5b8f6eeff8ca0cc84fee2',
		q: searchQuery,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: true,
		page,
		per_page: 40,
	});
	const { data } = await axios(`?${params}`);
	return data;
}