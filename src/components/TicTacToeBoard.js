import React, { useEffect, useState } from 'react'
import x from '../images/x.png'
import circle from '../images/circle.png'
import '../css/Button.css'

const enumGameResult = {
	isNotStarted: 0,
	player1Won: 1,
	player2Won: 2,
	draw: 3,
	resuming: 4,
}

const enumPlayer = {
	player1: 1,
	player2: 2,
}

export default function TicTacToeBoard() {
	const [boardArr, setBoardArr] = useState([])
	const [playerTurn, setPlayerTurn] = useState(0)
	const [gameResult, setGameResult] = useState(enumGameResult.isNotStarted)

	const initBoardArr = () => {
		const tmpBoardArr = []
		for (let i = 0; i < 3; i++) {
			const tmpBoardRowArr = []
			for (let j = 0; j < 3; j++) {
				tmpBoardRowArr.push(0)
			}
			tmpBoardArr.push(tmpBoardRowArr)
		}
		setBoardArr(tmpBoardArr)
	}

	useEffect(() => {
		initBoardArr()
	}, [])

	const cloneBoardArr = () => {
		const tmpBoardArr = []
		for (let i = 0; i < 3; i++) {
			const tmpBoardRowArr = []
			for (let j = 0; j < 3; j++) {
				tmpBoardRowArr.push(boardArr[i][j])
			}
			tmpBoardArr.push(tmpBoardRowArr)
		}
		return tmpBoardArr
	}

	const checkMoveResult = (tmpBoardArr, whoMadeTheMove, rowIdx, colIdx) => {
		let isItDraw = true
		let isCurrentPatternFinished = undefined
		let patternCount = undefined

		const checkMoveHelper = (curRowIdx, curColIdx) => {
			const curVal = tmpBoardArr[curRowIdx][curColIdx]
			if (curVal == 0) {
				isItDraw = false
				isCurrentPatternFinished = true
			} else if (curVal != whoMadeTheMove) {
				isCurrentPatternFinished = true
			} else {
				patternCount += 1
			}
		}

		let curRowIdx = undefined
		let curColIdx = undefined

		const reinitializeControlFlags = () => {
			isCurrentPatternFinished = false
			patternCount = 1
			curRowIdx = rowIdx
			curColIdx = colIdx
		}

		// region 1 - top-left to bottom-right

		reinitializeControlFlags()

		while (!isCurrentPatternFinished && curRowIdx > 0 && curColIdx > 0) {
			curRowIdx -= 1
			curColIdx -= 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		curRowIdx = rowIdx
		curColIdx = colIdx

		while (!isCurrentPatternFinished && curRowIdx < 2 && curColIdx < 2) {
			curRowIdx += 1
			curColIdx += 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		if (patternCount == 3) {
			if (whoMadeTheMove == enumPlayer.player1) {
				return enumGameResult.player1Won
			} else {
				return enumGameResult.player2Won
			}
		}

		// endregion

		// region 2 - top to bottom

		reinitializeControlFlags()

		while (!isCurrentPatternFinished && curRowIdx > 0) {
			curRowIdx -= 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		curRowIdx = rowIdx

		while (!isCurrentPatternFinished && curRowIdx < 2) {
			curRowIdx += 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		if (patternCount == 3) {
			if (whoMadeTheMove == enumPlayer.player1) {
				return enumGameResult.player1Won
			} else {
				return enumGameResult.player2Won
			}
		}

		// endregion

		// region 3 - top-right to bottom-left

		reinitializeControlFlags()

		while (!isCurrentPatternFinished && curRowIdx > 0 && curColIdx < 2) {
			curRowIdx -= 1
			curColIdx += 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		curRowIdx = rowIdx
		curColIdx = colIdx

		while (!isCurrentPatternFinished && curRowIdx < 2 && curColIdx > 0) {
			curRowIdx += 1
			curColIdx -= 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		if (patternCount == 3) {
			if (whoMadeTheMove == enumPlayer.player1) {
				return enumGameResult.player1Won
			} else {
				return enumGameResult.player2Won
			}
		}

		// endregion

		// region 4 - left to right

		reinitializeControlFlags()

		while (!isCurrentPatternFinished && curColIdx > 0) {
			curColIdx -= 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		curColIdx = colIdx

		while (!isCurrentPatternFinished && curColIdx < 2) {
			curColIdx += 1
			checkMoveHelper(curRowIdx, curColIdx)
		}

		if (patternCount == 3) {
			if (whoMadeTheMove == enumPlayer.player1) {
				return enumGameResult.player1Won
			} else {
				return enumGameResult.player2Won
			}
		}

		// endregion

		if (isItDraw) {
			return enumGameResult.draw
		}

		return enumGameResult.resuming
	}

	const onSquareClick = (e, key) => {
		const squareVal = Number(e.currentTarget.getAttribute('value'))
		if (squareVal == 0 && gameResult == enumGameResult.resuming) {
			const rowIdx = Number(key.substring(0, 1))
			const colIdx = Number(key.substring(2))
			const tmpBoardArr = cloneBoardArr()
			if (playerTurn == enumPlayer.player1) {
				tmpBoardArr[rowIdx][colIdx] = enumPlayer.player1
			} else {
				tmpBoardArr[rowIdx][colIdx] = enumPlayer.player2
			}
			setBoardArr(tmpBoardArr)

			const moveResult = checkMoveResult(
				tmpBoardArr,
				playerTurn,
				rowIdx,
				colIdx
			)

			setGameResult(moveResult)

			if (moveResult == enumGameResult.resuming) {
				if (playerTurn == enumPlayer.player1) {
					setPlayerTurn(enumPlayer.player2)
				} else {
					setPlayerTurn(enumPlayer.player1)
				}
			}
		}
	}

	return (
		<>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-around',
					height: '70px',
				}}
			>
				<div>
					<span>PLAYER 1</span>
				</div>
				<div>
					{gameResult == enumGameResult.draw && <span>DRAW!</span>}
					{gameResult == enumGameResult.player1Won && (
						<span>PLAYER 1 WON!</span>
					)}
					{gameResult == enumGameResult.player2Won && (
						<span>PLAYER 2 WON!</span>
					)}
				</div>
				<div>
					<span>PLAYER 2</span>
				</div>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					height: '70px',
				}}
			>
				<div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
					{gameResult != enumGameResult.resuming && (
						<button
							className='button'
							style={{ width: '90px' }}
							onClick={() => {
								initBoardArr()
								setPlayerTurn(enumPlayer.player1)
								setGameResult(enumGameResult.resuming)
							}}
						>
							PLAY
						</button>
					)}
				</div>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						width: '500px',
						height: '500px',
						backgroundColor: '#8d4009',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
					}}
				>
					{boardArr.map((rowArr, i) => {
						return (
							<div
								key={'row' + i}
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									width: '100%',
									height: '150px',
								}}
							>
								{rowArr.map((cell, j) => {
									return (
										<div
											key={'' + i + '_' + j}
											value={cell}
											style={{
												height: '100%',
												width: '150px',
												cursor:
													gameResult == enumGameResult.resuming
														? 'pointer'
														: undefined,
												backgroundColor: '#d77e42',
												backgroundImage:
													cell == 0
														? undefined
														: `url(${cell == enumPlayer.player1 ? x : circle})`,
												backgroundSize: 'cover',
											}}
											onClick={(e) => onSquareClick(e, '' + i + '_' + j)}
										></div>
									)
								})}
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
