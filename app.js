const colors = [
	'#282828', //black 
	'#fb4934', //red
	'#b8bb26', //green
	'#fabd2f', //yellow
	'#458588', //blue
	'#b16286', //purple
	'#8ec07c', //aqua
	'#fe8019', //orange
	'#661609', //brown
	'#e3e3e3'  //empty
]

var selectedCell
const main = document.getElementById('main-grid')
const cells = document.getElementsByClassName('cell')
const buttons = document.getElementsByClassName('button')


function checkValidColor(cell, color) {
	if (cell.getAttribute('data-color') === color) {
		return false
	} else { return true }
}

function checkInsideSubgrid(color) {
	let result = []
	const subgridCells = selectedCell.parentElement.children

	Array.from(subgridCells).forEach(cell => {
		if (cell === selectedCell) {
		} else {
			result.push(checkValidColor(cell, color))
		}
	})

	if (result.includes(false)) {
		return false
	} else { return true }
}

function checkHorizontalInsideSubgrid(subgridCells, color) {
	let result = []
	const indexCell = Array.from(subgridCells).indexOf(selectedCell)

	if (indexCell === 0 || indexCell === 3 || indexCell === 6) {
		result.push(checkValidColor(subgridCells[indexCell + 1], color))
		result.push(checkValidColor(subgridCells[indexCell + 2], color))
	} else if (indexCell === 1 || indexCell === 4 || indexCell === 7) {
		result.push(checkValidColor(subgridCells[indexCell + 1], color))
		result.push(checkValidColor(subgridCells[indexCell - 1], color))
	} else {
		result.push(checkValidColor(subgridCells[indexCell - 1], color))
		result.push(checkValidColor(subgridCells[indexCell - 2], color))
	}

	if (result.includes(false)) {
		return false
	} else { return true }
}

function checkHorizontalInAdjacents(subgrid, color) {
	let result = []
	const indexCell = Array.from(subgrid.children).indexOf(selectedCell)

	const mainGrid = subgrid.parentElement.children
	const indexSubgrid = Array.from(mainGrid).indexOf(subgrid)
	
	let adjacentSubgrid1
	let adjacentSubgrid2
	let row

	if (indexSubgrid === 0 || indexSubgrid === 3 || indexSubgrid === 6) {
		adjacentSubgrid1 = mainGrid[indexSubgrid + 1]
		adjacentSubgrid2 = mainGrid[indexSubgrid + 2]
	} else if (indexSubgrid === 1 || indexSubgrid === 4 || indexSubgrid === 7) {		
		adjacentSubgrid1 = mainGrid[indexSubgrid + 1]
		adjacentSubgrid2 = mainGrid[indexSubgrid - 1]
	} else {
		adjacentSubgrid1 = mainGrid[indexSubgrid - 1]
		adjacentSubgrid2 = mainGrid[indexSubgrid - 2]
	}

	if (indexCell === 0 || indexCell === 1 || indexCell === 2) {
		row = 1
	} else if (indexCell === 3 || indexCell === 4 || indexCell === 5) {
		row = 2
	} else {
		row = 3
	}

	if (row === 1) {
		for (let i = 0; i < 3; i++) {
			result.push(checkValidColor(adjacentSubgrid1.children[i], color))
			result.push(checkValidColor(adjacentSubgrid2.children[i], color))
		}
	} else if (row === 2) {
		for (let i = 3; i < 7; i++) {
			result.push(checkValidColor(adjacentSubgrid1.children[i], color))
			result.push(checkValidColor(adjacentSubgrid2.children[i], color))
		}

	} else {
		for (let i = 6; i < 9; i++) {
			result.push(checkValidColor(adjacentSubgrid1.children[i], color))
			result.push(checkValidColor(adjacentSubgrid2.children[i], color))
		}
	}
	
	if (result.includes(false)) {
		return false
	} else { return true }
}

function checkHorizontal(color) {
	let result = []

	const subgridCells = selectedCell.parentElement.children
	result.push(checkHorizontalInsideSubgrid(subgridCells, color))

	const subgrid = selectedCell.parentElement
	result.push(checkHorizontalInAdjacents(subgrid, color))

	if (result.includes(false)) {
		return false
	} else { return true }
}

function checkVerticalInsideSubgrid(subgridCells, color) {
	let result = []
	const indexCell = Array.from(subgridCells).indexOf(selectedCell)

	if (indexCell === 0 || indexCell === 1 || indexCell === 2) {
		result.push(checkValidColor(subgridCells[indexCell + 3], color))
		result.push(checkValidColor(subgridCells[indexCell + 6], color))
	} else if (indexCell === 3 || indexCell === 4 || indexCell === 5) {
		result.push(checkValidColor(subgridCells[indexCell - 3], color))
		result.push(checkValidColor(subgridCells[indexCell + 3], color))
	} else {
		result.push(checkValidColor(subgridCells[indexCell - 3], color))
		result.push(checkValidColor(subgridCells[indexCell - 6], color))
	}

	if (result.includes(false)) {
		return false
	} else { return true }
}

function checkVerticalInAdjacents(subgrid, color) {
	let result = []
	const indexCell = Array.from(subgrid.children).indexOf(selectedCell)
	const mainGrid = subgrid.parentElement.children
	const indexSubgrid = Array.from(mainGrid).indexOf(subgrid)

	let adjacentSubgrid1
	let adjacentSubgrid2
	let column

	if (indexSubgrid === 0 || indexSubgrid === 1 || indexSubgrid === 2) {
		adjacentSubgrid1 = mainGrid[indexSubgrid + 3]
		adjacentSubgrid2 = mainGrid[indexSubgrid + 6]
	} else if (indexSubgrid === 3 || indexSubgrid === 4 || indexSubgrid === 5) {		
		adjacentSubgrid1 = mainGrid[indexSubgrid + 3]
		adjacentSubgrid2 = mainGrid[indexSubgrid - 3]
	} else {
		adjacentSubgrid1 = mainGrid[indexSubgrid - 3]
		adjacentSubgrid2 = mainGrid[indexSubgrid - 6]
	}

	if (indexCell === 0 || indexCell === 3 || indexCell === 6) {
		column = 1
	} else if (indexCell === 1 || indexCell === 4 || indexCell === 7) {
		column = 2
	} else {
		column = 3
	}

	if (column === 1) {
		for (let i = 0; i < 7; i += 3) {
			result.push(checkValidColor(adjacentSubgrid1.children[i], color))
			result.push(checkValidColor(adjacentSubgrid2.children[i], color))
		}
	} else if (column === 2) {
		for (let i = 1; i < 8; i += 3) {
			result.push(checkValidColor(adjacentSubgrid1.children[i], color))
			result.push(checkValidColor(adjacentSubgrid2.children[i], color))
		}

	} else {
		for (let i = 2; i < 9; i += 3) {
			result.push(checkValidColor(adjacentSubgrid1.children[i], color))
			result.push(checkValidColor(adjacentSubgrid2.children[i], color))
		}
	}
	
	if (result.includes(false)) {
		return false
	} else { return true }
}

function checkVertical(color) {
	let result = []

	const subgridCells = selectedCell.parentElement.children
	result.push(checkVerticalInsideSubgrid(subgridCells, color))

	const subgrid = selectedCell.parentElement
	result.push(checkVerticalInAdjacents(subgrid, color))

	if (result.includes(false)) {
		return false
	} else { return true }
}


function actionIsValid(color) {
	if (checkInsideSubgrid(color) === true
		&& checkHorizontal(color) === true
		&& checkVertical(color) === true) {
		return true
	} else { return false }
}

function generateNewGame() {
	const subgrids = main.children
	Array.from(subgrids).forEach(subgrid => {
		let usedColorIndexes = []
		Array.from(subgrid.children).forEach(cell => {
			selectedCell = cell
			const randomIndex = Math.floor(Math.random() * 8)
			if (usedColorIndexes.includes(randomIndex) === false
				&& actionIsValid(colors[randomIndex])) {
				cell.style.background = colors[randomIndex]
				cell.setAttribute('data-color', colors[randomIndex])
				usedColorIndexes.push(randomIndex)
			} else {}
			usedColorIndexes = []
		})
		//for (const [index, cell] of Array.from(subgrid.children).entries()) {
//
//			cell.style.background = colors[shuffledIndex[index]]
//			cell.setAttribute('data-color', colors[shuffledIndex[index]])
//		}
	})
	selectedCell = undefined
}


function initControls() {
	for (let i = 0; i < buttons.length - 1; i++) {
		buttons[i].style.background = colors[i]
		buttons[i].addEventListener('click', (e) => {
			if (selectedCell && actionIsValid(colors[i]) === true) {
				selectedCell.style.background = colors[i]
				selectedCell.setAttribute('data-color', colors[i])
			} else {
				// visual alert for prohibited action	
			}
		})
	}

	Array.from(buttons).at(-1).addEventListener('click', (e) => {
		selectedCell.style.background = colors[9]
		selectedCell.removeAttribute('data-color')
	})
}

function initCells(){
	for (let i = 0; i < cells.length; i++) {
		if (cells[i].getAttribute('data-color') === null) {
			cells[i].addEventListener('click', (e) => {
				try {
					selectedCell.classList.remove('selected')
				} catch (e) {
					console.log('Welcome to the game!')
				}
				selectedCell = e.target
				selectedCell.classList.add('selected')
				// deselect when click outside
			})
		}
	}
}

function play() {
	generateNewGame()
	initCells()
	initControls()
}

play()
