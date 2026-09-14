import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import turkiyeSvgUrl from './images/turkiye.svg'

export default function TurkiyePage() {
	const [turkiyeSvg, setTurkiyeSvg] = useState('')

	useEffect(() => {
		fetch(turkiyeSvgUrl)
			.then((response) => response.text())
			.then((text) => setTurkiyeSvg(text))
	}, [])

	const handleClick = (event) => {
		const path = event.target.closest('path')

		if (!path) return

		console.log(path.id)
		console.log(path.getAttribute('name'))
	}

	return (
		<>
			<NavBar />
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<div
					onClick={handleClick}
					dangerouslySetInnerHTML={{ __html: turkiyeSvg }}
				/>
			</div>
		</>
	)
}
