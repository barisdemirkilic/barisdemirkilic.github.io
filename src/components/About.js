import React from 'react'
import NavBar from './NavBar'

export default function About() {
	return (
		<>
			<NavBar />
			<div style={{ width: '100%', height: '500px' }}>
				<img
					src='./src/images/islandofgiresun.jpg'
					className='containImg'
					style={{ objectFit: 'cover' }}
				/>
			</div>
			{/* <video autoPlay loop muted>
        <source src="../../static/videos/Antmedia-Web.mp4" type="video/mp4" />
      </video> */}
		</>
	)
}
