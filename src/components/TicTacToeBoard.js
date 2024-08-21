import React, { useEffect, useState } from 'react'

export default function TicTacToeBoard() {
	const [boardArr, setBoardArr] = useState([])

	useEffect(() => {
		const tmpBoardArr = []
		for (let i = 0; i < 3; i++) {
			const tmpBoardRowArr = []
			for (let j = 0; j < 3; j++) {
				tmpBoardRowArr.push(0)
			}
			tmpBoardArr.push(tmpBoardRowArr)
		}
		setBoardArr(tmpBoardArr)
	}, [])

	return (
		<div style={{ width: '500px', height: '500px' }}>
			{boardArr.map((rowArr) => {
				return (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
							height: '150px',
						}}
					>
						{rowArr.map((cell) => {
							return (
								<div style={{ height: '100%', width: '150px' }}>{cell}</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
