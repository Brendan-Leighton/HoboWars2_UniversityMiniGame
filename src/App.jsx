import { useState } from 'react'
import './App.css'
import { TbRefreshDot } from "react-icons/tb";
import { useBoard } from './components/Board/useBoard.jsx';

function App() {
	const color = ['green', 'yellow', 'red'];
	// const [board, setBoard] = useState(createBoard());

	const [board, updateRow, updateCol] = useBoard(createBoard());
	let highScore = 0;

	// console.log('board:: ', board);


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
		// console.log('calculateScore -> boardToCalc: ', boardToCalc);
		let tempScore = 0;

		let logging = ``;

		boardToCalc.forEach(row => {
			logging += '\n\t['
			row.forEach(dot => {
				dot.props.children.props.className.split(' ').forEach(className => {
					if (className === 'red' || className === 'yellow' || className === 'green') {
						const dotScore = getColorScore(className);
						// console.log(`Calculate Score: ${className} = ${getColorScore(className)}`);
						tempScore += dotScore;
						dotScore === -1 ? logging += ` ${dotScore} ` : logging += `  ${dotScore} `; // extra space in else, so 2 spaces before ${dotScore}
					}
				})
			})
			logging += ']'
		})

		// console.log(`New Score: ${tempScore}\n${logging}\n`);

		if (tempScore > highScore) highScore = tempScore;
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

	function cycleRow(rowIndex) {
		// console.log(`cycleRow(${rowIndex})`);

		// get dots in row
		const rowDots = document.querySelectorAll(`[data-row="${rowIndex}"]`)
		// console.log('rowDots', rowDots);
		const newRow = []

		updateRow(rowDots, rowIndex)
	}

	function cycleCol(columnIndex) {
		// console.log(`cycleCol(${columnIndex})`);

		// get dots in col
		const colDots = document.querySelectorAll(`[data-col="${columnIndex}"]`)
		// console.log('colDots', colDots);

		updateCol(colDots, columnIndex);
	}

	function cycleColor(currColor) {

		let currColorIndex = color.findIndex(value => value === currColor);

		if (currColorIndex === 2) currColorIndex = -1;
		return color[currColorIndex + 1]
	}

	return (
		<>
			<header>
				<h1>HoboWars2 University Mini-Game</h1>
			</header>
			<div className="info">
				<p>Press the <TbRefreshDot /> button to cycle the colors for adjacent row/column.</p>
				<p>Colors cycle: <span className="green color-text">Green</span> {'>'} <span className="red color-text">Red</span> {'>'} <span className="yellow color-text">Yellow</span></p>
			</div>
			<div className="scores">
				<div className="score">Score: {calculateScore(board)}</div>
				<div className="high-score">High Score: {highScore}</div>
			</div>
			<div className='grid'>
				{renderCycleButtons(true)}
				{renderCycleButtons(false)}
				<div className="board">
					{board}
				</div>
			</div>
		</>
	)
}

export default App
