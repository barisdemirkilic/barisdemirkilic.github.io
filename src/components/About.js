import React from 'react'
import NavBar from './NavBar'
import island_of_giresun from '../images/island_of_giresun.jpg'

export default function About() {
	return (
		<>
			<NavBar />
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<p>
					<span>HI! I'm Baris.</span>
					<br />
					<span>Trying to see what can I do...</span>
				</p>
			</div>
			{/* <div
				style={{
					width: '100vw',
					height: '100vh',
					backgroundImage: `url(${island_of_giresun})`,
					backgroundSize: 'cover',
				}}
			>
			</div> */}
			{/* <video autoPlay loop muted>
        <source src="../../static/videos/Antmedia-Web.mp4" type="video/mp4" />
      </video> */}
		</>
	)
}
