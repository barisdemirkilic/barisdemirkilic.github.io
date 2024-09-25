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
						<a href='#/Game'>Game</a>
					</li>
				</ul>
			</div>
		</>
	)
}
