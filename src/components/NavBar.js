import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
	const navigate = useNavigate()

	return (
		<>
			<div id='navBar'>
				<div
					onClick={() => navigate('/')}
					style={{ height: '100%', width: '50px', cursor: 'pointer' }}
				>
					<img
						src='../images/barisdemirkilic_logo.png'
						className='containImg'
					/>
				</div>
				<div style={{ height: '100%', width: '50px' }} />
				<div
					style={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<span
						onClick={() =>
							window.open(
								'https://www.youtube.com/channel/UCIpLyhmLR7-lsZNs3aLs_iQ',
								'_blank'
							)
						}
						className='navBarLink'
					>
						YouTube
					</span>
					{/* <span style={{ width: '20px' }}></span>
          <span onClick={() => navigate('/videos')} className="navBarLink">
            My Videos
          </span> */}
				</div>
			</div>
			<div id='navBarDummyDiv' />
		</>
	)
}
