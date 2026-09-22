import React, { useEffect, useRef, useState } from 'react'
import NavBar from './NavBar'
import turkiyeSvgUrl from '../images/turkiye.svg'

export default function TurkiyePage() {
	const [turkiyeSvg, setTurkiyeSvg] = useState('')
	const [selectedProvinces, setSelectedProvinces] = useState(new Set())

	const mapRef = useRef(null)

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

		setSelectedProvinces((prev) => {
			const next = new Set(prev)

			if (next.has(path.id)) {
				next.delete(path.id)
			} else {
				next.add(path.id)
			}

			return next
		})
	}

	useEffect(() => {
		if (!mapRef.current) return

		const paths = mapRef.current.querySelectorAll('path')

		paths.forEach((path) => {
			if (selectedProvinces.has(path.id)) {
				path.classList.add('selected')
			} else {
				path.classList.remove('selected')
			}
		})
	}, [selectedProvinces])

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
