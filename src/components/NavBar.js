import React from 'react'
import '../css/NavBar.css'

export default function NavBar() {
	return (
		<>
			<div id='navBar'>
				<ul>
					<li>
						<a href='/'>About</a>
					</li>
					<li>
						<a href='#/TicTacToe'>Tic Tac Toe</a>
					</li>
				</ul>
			</div>
		</>
	)
}
