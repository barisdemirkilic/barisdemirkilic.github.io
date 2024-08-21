import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './About'
import Game from './Game'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<About />} />
				<Route exact path='/Game' element={<Game />} />
			</Routes>
		</BrowserRouter>
	)
}
