import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar.js'

class App extends Component {
	render() {
		return (
		<div>
			<h1 className="title">Financial Product Search</h1>
			<SearchBar />
		</div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('.app'))