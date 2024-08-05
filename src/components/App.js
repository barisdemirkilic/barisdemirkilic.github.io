import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './About'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<About />} />
			</Routes>
		</BrowserRouter>
	)
}
