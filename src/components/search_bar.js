import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import data from '../../data.js'
import _ from 'lodash'
import Highlight from 'react-highlighter'

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.updateList = this.updateList.bind(this)
		this.toggleActive = this.toggleActive.bind(this)
		this.setFilter = this.setFilter.bind(this)
		this.filteringFunc = this.filteringFunc.bind(this)
		this.state = {
			activeIndex: -1,
			trueData: [],
			sortedList: [],
			displayData: [],
			term: '',
			hidden: true,
			filterTerm: 'all'

		}
	}
	componentWillMount() {
		//First the data is fetched and vetted for unqiue values
		let uniqueData = _.uniqWith(data.products, _.isEqual)

		//Then I add a display value that will be rendered to the DOM
		//and can be manipulated easily with our Highlighting Package
		//while keeping the original name easily searchable
		uniqueData = uniqueData.map((item) => {
			item.display = <span>{item.name}</span>
			return item
		})
		this.setState({
			trueData: uniqueData
		})
	}
	getList(listData) {
		// getList is called upon rendering the application and rerenders everytime state is changed

		if (!this.state.hidden) {

			// If the list is empty display a message conveying this
			if (listData.length === 0 && this.state.term !== '') {
				return(
					<div className='list-item'>
						¯\_(ツ)_/¯ Looks like there are no products that match that search.
					</div>)
			}

			// if the list is longer then 10 cut it down to 10 as to not overwhelm the user
			// with options and to save screen space

			const truncatedList = _.slice(listData, 0, 10)

			//Now iterate through the truncated array, displaying the optioins the user can select

			const list = truncatedList.map((item, i) => {
				let divClass = 'list-item'

				// Active index is used to determine which link to open when the user chooses to
				//navigate with the keyboard

				if (i === this.state.activeIndex) {
					divClass = divClass + ' active'
				}
				return (
					<div key={i} className={divClass} onClick={() => window.open(item.url)}>
						<div className="item-name">{item.display} <span className="item-type">{item.type.toLowerCase()}</span></div>
					</div>
				)
			})
			return(list)
		}
	}

	//Update list is called when a user changes the input field. This is the autocomplete funcationality.
	updateList(event) {
		this.setState({term: event.target.value, hidden: false}, () => {
			// If there is no search term don't display anything. This is for intial render as well as
			// when a user deletes the entire string
			if (this.state.term === '') {
				this.setState({
					filteredObjects: [],
					activeIndex: -1,
					hidden: true
				})
			}
			// Otherwise we are using index of to see if there is a regex match, if this is the case
			// then we change the display of the item to bolden the matched characters using the
			// highlight plugin and return the item.
			else {
				let filteredObjects = this.state.trueData.map((item) => {
					if (item.name.toLowerCase().indexOf(this.state.term.toLowerCase()) > -1) {
						item.display = <Highlight search={this.state.term}>{item.name}</Highlight>
						return item
					}
				})
				// get rid of any undefined slots in our array
				filteredObjects = _.filter(filteredObjects,function (value) {
					return value!==undefined
				})
				// return the new sorted list which in turn, rerendered the getList Function with 
				// the new data
				this.setState({
					sortedList: filteredObjects,
					activeIndex: -1
				}, () => {this.filteringFunc()})
			}
		})
	}

	// toggleActive allows the user to navigate up and down the list of results with the
	// arrow keys. The term highlighting over will populate the search field with the active name.
	// Presssing enter will open up a window of the selected term.
	toggleActive(event) {
		let newIndex = this.state.activeIndex

		if (event.keyCode == '38') {
			newIndex--
			if (newIndex > -1) {
				this.setState({
					activeIndex: newIndex
				}, () => {
					this.setState({term: this.state.displayData[newIndex].name})
				})
			}
		}
		else if (event.keyCode == '40') {
			newIndex++
			if (newIndex === this.state.displayData.length || newIndex === 10) {
				newIndex = 0
			}
			this.setState({
				activeIndex: newIndex
			}, () => {
				this.setState({term: this.state.displayData[newIndex].name})
			})
		}
		else if (event.keyCode == '13') {
			this.setState({
				term: this.state.displayData[this.state.activeIndex].name,
				hidden: true
			})
			window.open(this.state.displayData[this.state.activeIndex].url)
		}
	}

	// Changed filter based on user input from select or when a new character is entered
	setFilter(event) {
		if (typeof event !== 'undefined') {
			this.setState({filterTerm: event.target.value}, () => {this.filteringFunc()})
		}
		else {
			this.filteringFunc()
		}
	}

	// Changed filter based on user input from select
	filteringFunc() {
		const listData = _.filter(this.state.sortedList, (item) => {
			if (this.state.filterTerm === 'all') {
				return item
			}
			else if (item.type === this.state.filterTerm) {
				return item
			}
		})
		this.setState({
			displayData: listData,
			activeIndex: -1
		})
	}

	render() {
		return (
			<div className="search">
				<select className="select" onChange={this.setFilter}>
					<option value="all">All</option>
					<option value="BANK">Banks</option>
					<option value="INVESTMENT">Investments</option>
					<option value="CREDIT_CARD">Credit Cards</option>
					<option value="LOAN">Loans</option>
					<option value="MORTGAGE">Mortgages</option>
				</select>
				<input
					placeholder="Enter Financial Product"
					className="search-box"
					onFocus={() => this.setState({hidden: false})}
					onChange={this.updateList}
					onKeyDown={this.toggleActive}
					value={this.state.term}
				/>
				<div className="list-container">
					{this.getList(this.state.displayData)}
				</div>
			</div>
		)
	}
}

export default SearchBar
