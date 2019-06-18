/** @jsx h */

import { h, Component } from 'preact';
import Portal from 'preact-portal';
import debounce from  'lodash/debounce';

class SearchWidget extends Component {
	constructor() {
		super( ...arguments );
		this.requestId = 0;
		this.state = {
			query: this.props.initialValue,
			results: []
		};
		this.onChangeQuery = this.onChangeQuery.bind( this );
		this.getResults = debounce( this.getResults.bind( this ), 500 );
		this.getResults( this.props.initialValue );
	}
	getResults( query ) {
		if ( query ) {
			const { api } = this.props;
			if ( api ) {
				this.requestId++;
				const requestId = this.requestId;
				api( query )
					.then( ( response ) => {
						return response.json();
					} )
					.then( ( json ) => {
						if ( this.requestId === requestId ) {
								this.setState( { ...json } );
							}
						}
					);
			}
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
		if ( this.props.grabFocus ) {
			this.input.focus();
		}
	}
	render() {
		const { query, results } = this.state;
		const { SearchResults } = this.props;
		return (
			<div>
				
				<p><input type="text" value={ query } onInput={ this.onChangeQuery } ref={ input => this.input = input } /></p>
				<Portal into="#results">
					<SearchResults results={ results } query={ query } />
				</Portal>
			</div>
		);
	}
}

export default SearchWidget;
