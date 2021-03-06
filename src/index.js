/** @jsx h */

import JetpackSearchAPI from '../components/api';
import SearchResults from '../components/search-results';
import SearchWidget from '../components/search-widget';
import { h, render } from 'preact';

const api = new JetpackSearchAPI();

const injectSearchWidget = ( initialValue, target, grabFocus ) => {
	render(
		<SearchWidget initialValue={ initialValue } grabFocus={ grabFocus } SearchResults={ SearchResults } api={ api } />,
		document.body,
		target
	);
};

window.injectSearchWidget = injectSearchWidget;
