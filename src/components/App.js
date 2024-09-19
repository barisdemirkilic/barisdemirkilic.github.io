import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import About from './About'
import Game from './Game'

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route exact path='/' element={<About />} />
				<Route exact path='/Game' element={<Game />} />
			</Routes>
		</HashRouter>
	)
}
