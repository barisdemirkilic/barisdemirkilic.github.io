import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import AboutPage from './AboutPage'
import TicTacToePage from './TicTacToePage'

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route exact path='/' element={<AboutPage />} />
				<Route exact path='/TicTacToe' element={<TicTacToePage />} />
			</Routes>
		</HashRouter>
	)
}
