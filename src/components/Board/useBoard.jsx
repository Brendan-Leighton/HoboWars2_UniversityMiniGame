import { useState } from "react"

export const useBoard = (initialBoard) => {
	const color = ['green', 'yellow', 'red'];

	const [board, setBoard] = useState(initialBoard);

	function updateBoard(newBoard) {
		setBoard([[...newBoard[0]], [...newBoard[1]], [...newBoard[2]], [...newBoard[3]]])
	}

	function cycleColor(currColor) {

		let currColorIndex = color.findIndex(value => value === currColor);

		if (currColorIndex === 2) currColorIndex = -1;
		return color[currColorIndex + 1]
	}

	function renderDot(rowNumber, colNumber, color = undefined) {

		color = color === undefined ? getRandomColor() : color;

		return (
			<div className='dot' data-row={rowNumber} data-col={colNumber} key={`${rowNumber}_${colNumber}`}>
				<div className={`${color} color`}></div>
			</div>
		)
	}

	function updateRow(rowDotElements, rowIndex) {
		const newBoard = [...board];
		const newRow = []

		// create new Dot elements and add them to newRow
		rowDotElements.forEach((dot, colIndex) => {
			const colorElement = dot.getElementsByClassName('color')[0];

			for (let value of colorElement.classList.values()) {
				if (value === 'red' || value === 'green' || value === 'yellow') {
					newRow.push(renderDot(rowIndex, colIndex, cycleColor(value)))
				}
			}
		})

		// add newRow to newBoard
		newBoard[rowIndex] = newRow;

		// update board state
		updateBoard(newBoard);
	}

	function updateColumn(colDotElements, columnIndex) {
		const newBoard = [...board];
		const newCol = []

		// create new Dot elements and add them to newCol
		colDotElements.forEach((dot, rowIndex) => {
			const colorElement = dot.getElementsByClassName('color')[0];

			for (let value of colorElement.classList.values()) {
				if (value === 'red' || value === 'green' || value === 'yellow') {
					newCol.push(renderDot(rowIndex, columnIndex, cycleColor(value)))
				}
			}
		})

		// add newCol dot-elements to newBoard
		newCol.forEach((dot, rowIndex) => {
			newBoard[rowIndex][columnIndex] = dot;
		})
		console.log('cycleCol => newBoard: ', newBoard);

		// updated board state
		updateBoard(newBoard);
	}

	return [board, updateRow, updateColumn]
}