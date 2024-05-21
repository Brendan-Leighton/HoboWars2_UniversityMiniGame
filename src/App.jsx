import { useState } from 'react'
import './App.css'
import { TbRefreshDot } from "react-icons/tb";
import { useBoard } from './components/Board/useBoard.jsx';

function App() {
	const color = ['green', 'yellow', 'red'];
	// const [board, setBoard] = useState(createBoard());

	const [board, updateRow, updateCol] = useBoard(createBoard());

	console.log('board:: ', board);


	function getRandomColor() {
		const randomIndex = Math.floor(Math.random() * 3);
		return color[randomIndex];
	}

	function createBoard() {

		const newBoard = [[], [], [], []]

		newBoard.forEach((row, rowIndex) => {
			for (let colIndex = 0; colIndex < 4; colIndex++) {
				row[colIndex] = renderDot(rowIndex, colIndex);
			}
		});

		return newBoard;
	}

	function getColorScore(color) {
		color.trim();
		if (color === 'green') return 1
		if (color === 'yellow') return 0
		if (color === 'red') return -1
	}

	function calculateScore(boardToCalc) {
		console.log('calculateScore -> boardToCalc: ', boardToCalc);
		let tempScore = 0;

		let logging = ``;

		boardToCalc.forEach(row => {
			logging += '\n\t['
			row.forEach(dot => {
				dot.props.children.props.className.split(' ').forEach(className => {
					if (className === 'red' || className === 'yellow' || className === 'green') {
						const dotScore = getColorScore(className);
						console.log(`Calculate Score: ${className} = ${getColorScore(className)}`);
						tempScore += dotScore;
						dotScore === -1 ? logging += ` ${dotScore} ` : logging += `  ${dotScore} `;
					}
				})
			})
			logging += ']'
		})

		console.log(`New Score: ${tempScore}\n${logging}\n`);
		return tempScore;
	}

	function renderDot(rowNumber, colNumber, color = undefined) {

		color = color === undefined ? getRandomColor() : color;

		return (
			<div className='dot' data-row={rowNumber} data-col={colNumber} key={`${rowNumber}_${colNumber}`}>
				<div className={`${color} color`}></div>
			</div>
		)
	}

	// function renderRowButton(index) {
	// 	return (
	// 		<button className={`row${index}`} onClick={() => cycleRow(index)} key={`row_${index}`}><TbRefreshDot /></button>
	// 	)
	// }

	// function renderRowButtons() {

	// 	const buttons = [];

	// 	for (let index = 0; index < 4; index++) {
	// 		buttons.push(renderRowButton(index))
	// 	}

	// 	return buttons;
	// }

	// function renderColButton(index) {
	// 	return (
	// 		<button className={`col${index}`} onClick={() => cycleCol(index)} key={`col_${index}`}><TbRefreshDot /></button>
	// 	)
	// }

	function renderCycleButton(isRowButton, index) {

		const axisString = isRowButton ? 'row' : 'col';
		const axisFunction = (index) => {
			return isRowButton ? cycleRow(index) : cycleCol(index);
		}

		return <button className={`${axisString}${index}`} onClick={() => axisFunction(index)} key={`${axisString}_${index}`}><TbRefreshDot /></button>
	}

	function renderCycleButtons(isRowButtons) {
		const buttons = []

		for (let index = 0; index < 4; index++) {
			buttons.push(renderCycleButton(isRowButtons, index))
		}

		return buttons;
	}

	// function renderColButtons() {

	// 	const buttons = [];

	// 	for (let index = 0; index < 4; index++) {
	// 		buttons.push(renderColButton(index))
	// 	}

	// 	return buttons;
	// }

	// function copyBoard(oldBoard) {

	// 	const newBoard = [];
	// 	oldBoard.forEach(row => {
	// 		newBoard.push(row)
	// 	})
	// 	return newBoard;
	// }

	function cycleRow(rowIndex) {
		console.log(`cycleRow(${rowIndex})`);

		// get dots in row
		const rowDots = document.querySelectorAll(`[data-row="${rowIndex}"]`)
		console.log('rowDots', rowDots);
		const newRow = []

		updateRow(rowDots, rowIndex)
		// const newBoard = copyBoard(board);

		// rowDots.forEach((dot, colIndex) => {
		// 	const colorElement = dot.getElementsByClassName('color')[0];

		// 	for (let value of colorElement.classList.values()) {
		// 		if (value === 'red' || value === 'green' || value === 'yellow') {
		// 			newRow.push(renderDot(rowIndex, colIndex, cycleColor(value)))
		// 		}
		// 	}
		// })

		// newBoard[rowIndex] = newRow;

		// setBoard(() => [...newBoard])
	}

	function cycleCol(columnIndex) {
		console.log(`cycleCol(${columnIndex})`);

		// get dots in col
		const colDots = document.querySelectorAll(`[data-col="${columnIndex}"]`)
		console.log('colDots', colDots);

		updateCol(colDots, columnIndex);

		// const newCol = []

		// colDots.forEach((dot, rowIndex) => {
		// 	const colorElement = dot.getElementsByClassName('color')[0];

		// 	for (let value of colorElement.classList.values()) {
		// 		if (value === 'red' || value === 'green' || value === 'yellow') {
		// 			newCol.push(renderDot(rowIndex, columnIndex, cycleColor(value)))
		// 		}
		// 	}
		// })

		// // this gives the newBoard a new reference - each nested array needs to be copied.
		// let newBoard = [[...board[0]], [...board[1]], [...board[2]], [...board[3]]];

		// newCol.forEach((dot, rowIndex) => {
		// 	newBoard[rowIndex][columnIndex] = dot;
		// })
		// console.log('cycleCol => newBoard: ', newBoard);

		// setBoard(() => [...newBoard])
	}

	function cycleColor(currColor) {

		let currColorIndex = color.findIndex(value => value === currColor);

		if (currColorIndex === 2) currColorIndex = -1;
		return color[currColorIndex + 1]
	}

	return (
		<>
			<div className="score">Score: {calculateScore(board)}</div>
			<div className='grid'>
				{renderCycleButtons(true)}
				{renderCycleButtons(false)}
				{/* {renderRowButtons()} */}
				{/* {renderColButtons()} */}
				<div className="board">
					{board}
				</div>
			</div>
		</>
	)
}

export default App
