import React from 'react'
import NavBar from './NavBar'
import TicTacToeBoard from './TicTacToeBoard'

export default function Game() {
	return (
		<>
			<NavBar />
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<TicTacToeBoard></TicTacToeBoard>
			</div>
		</>
	)
}
