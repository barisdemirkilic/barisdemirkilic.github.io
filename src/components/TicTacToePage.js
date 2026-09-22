import React from 'react'
import NavBar from './NavBar'
import TicTacToeBoard from './TicTacToeBoard'
import Version from './Version'

export default function TicTacToePage() {
	return (
		<>
			<NavBar />
			<TicTacToeBoard />
			<Version />
		</>
	)
}
