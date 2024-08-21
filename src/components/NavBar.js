import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/NavBar.css'

export default function NavBar() {
	const navigate = useNavigate()

	return (
		<>
			<div
				id='navBar'
				// style={{ height: '50px', fontSize: '26px', fontWeight: 'bold' }}
			>
				{/* <div
					onClick={() => navigate('/')}
					style={{ height: '100%', width: '50px', cursor: 'pointer' }}
				>
					<img src='./images/barisdemirkilic_logo.png' className='containImg' />
				</div>
				<div style={{ height: '100%', width: '50px' }} /> */}
				<div>
					<span onClick={() => navigate('/')}>About</span>
					<span onClick={() => navigate('/Game')}>Game</span>
					{/* <span
						onClick={() =>
							window.open(
								'https://www.youtube.com/channel/UCIpLyhmLR7-lsZNs3aLs_iQ',
								'_blank'
							)
						}
						className='navBarLink'
					>
						YouTube
					</span> */}
					{/* <span style={{ width: '20px' }}></span>
          <span onClick={() => navigate('/videos')} className="navBarLink">
            My Videos
          </span> */}
				</div>
			</div>
		</>
	)
}
