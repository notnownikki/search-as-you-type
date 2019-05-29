/** @jsx h */

import { h, render, Component } from 'preact';

class SearchResult extends Component {
	render() {
		const { result } = this.props;
		return <p>{ result.title }</p>;
	}
}

class SearchWidget extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			query: this.props.initialValue,
			results: []
		};
		this.onChangeQuery = this.onChangeQuery.bind( this );
		this.getResults = this.getResults.bind( this );
		this.getResults( this.props.initialValue );
	}
	getResults( query ) {
		// TODO: all of this! These are mock results to demo the as-you-type nature of the component.
		if ( query ) {
			const results = [];
			const numResults = Math.floor( Math.random() * (5 - 0 + 1) + 0 );
			for ( let i = 0; i < numResults; i++ ) {
				results.push( { title: 'Search result for ' + query } );
			}
			this.setState( { results } );
		} else { 
			this.setState( { results: [] } );
		}
	}
	onChangeQuery( event ) {
		const query = event.target.value;
		this.setState( { query } );
		this.getResults( query );
	}
	componentDidMount() {
		// TODO: only set focus if the search had focus before (needs a new prop to indicate if we should take focus)
		this.input.focus();
	}
	render() {
		const { query, results } = this.state;
		// TODO: Results might want to be rendered into a separate element rather than inline.
		return (
			<div>
				<p>You are searching for "{ query }".</p>
				<p><input type="text" value={ query } onInput={ this.onChangeQuery } ref={ input => this.input = input } /></p>
				{ results.map( ( result ) => <SearchResult result={ result } /> ) }
			</div>
		);
	}
}

const injectSearchWidget = ( initialValue, target ) => {
	render(
		<SearchWidget initialValue={ initialValue } />,
		document.body,
		target
	);
};

window.injectSearchWidget = injectSearchWidget;
