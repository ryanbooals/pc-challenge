# PC Autocomplete

This is a single page web application build with React.Js and is currently in deployement at https://pc-test.herokuapp.com/.
### How to build
You to have node.js installed in order to run locally.
1. Fork this repository
2. Run 'npm install'
3. Run 'npm run dev'
4. Go to localhost:8080

--or--

1. Fork this repository
2. npm install
3. npm run postinstall
4. npm start
5. Go to localhost:8080

### UX
User is able to type a search term and has two ways to navigate to desired links. The first is the with the mouse. Hovering over suggestions gives visual feedback by a) changing the color of the to-be-clicked product and b) changing the cursor to a pointer. The second is with the arrow keys. If there are multiple results, they user can use the up and down buttons to navigate through the search results. Pressing enter will open up a window to the selected product's url.


The type of product, being auxillary, is listed in a muted color and put to the side of each search result. One both Desktop and Tablet sizes, the user is able to futher filter their search results using the select input.

### Data

The data file is exported as a module and imported directly into the application. It is then assigned to a state as a 'source-of-truth' for future use. There are two different data sets that are broken down.
1)  this.state.sortedList is the result of filtering down the original data using a search term.
2) this.state.displayData is the data that is displayed to the screen. This could simply be the sortedList or the sortedList with the user's type-filter applied. This is the data that is traversed when using the arrow keys.

### Feature Creep -- What can be improved

* History/Cookies

