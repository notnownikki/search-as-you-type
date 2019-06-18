function getAPIUrl( query ) {
	let url = 'https://public-api.wordpress.com/rest/v1.3/sites/20115252/search?q=';
	url += encodeURIComponent( query );
	url += '&fields=author';
	return url;
}

function fetchSearchResults( query ) {
	return window.fetch( getAPIUrl( query ) );
}

export default fetchSearchResults;
