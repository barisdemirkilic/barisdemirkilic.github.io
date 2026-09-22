import React, { useEffect, useRef, useState } from 'react'
import NavBar from './NavBar'
import turkiyeSvgUrl from '../images/turkiye.svg'
import '../css/Turkiye.css'
import Version from './Version'

export default function TurkiyePage() {
	const visitedProvincesStorageKey = 'VisitedProvinces'
	const totalProvinceCount = 81

	const [turkiyeSvg, setTurkiyeSvg] = useState('')
	const [visitedProvinces, setVisitedProvinces] = useState(new Set())
	const [hoveredProvince, setHoveredProvince] = useState()

	const mapRef = useRef(null)

	useEffect(() => {
		async function loadAsync() {
			const turkiyeSvgResponse = await fetch(turkiyeSvgUrl)
			const turkiyeSvgText = await turkiyeSvgResponse.text()
			setTurkiyeSvg(turkiyeSvgText)
		}
		loadAsync()
	}, [])

	useEffect(() => {
		if ((turkiyeSvg || '') != '') {
			const stored = localStorage.getItem(visitedProvincesStorageKey)
			if (stored) {
				setVisitedProvinces(new Set(JSON.parse(stored)))
			}
		}
	}, [turkiyeSvg])

	const handleClick = (event) => {
		const path = event.target.closest('path')

		if (!path) return

		setVisitedProvinces((prev) => {
			const next = new Set(prev)

			if (next.has(path.id)) {
				next.delete(path.id)
			} else {
				next.add(path.id)
			}

			localStorage.setItem(
				visitedProvincesStorageKey,
				JSON.stringify(Array.from(next)),
			)
			return next
		})
	}

	useEffect(() => {
		if (!mapRef.current) return

		const paths = mapRef.current.querySelectorAll('path')

		paths.forEach((path) => {
			if (visitedProvinces.has(path.id)) {
				path.classList.add('selected')
			} else {
				path.classList.remove('selected')
			}
		})
	}, [visitedProvinces])

	const handleMouseMove = (event) => {
		const path = event.target.closest('path')

		if (!path) {
			setHoveredProvince(undefined)
			return
		}

		setHoveredProvince({
			name: path.getAttribute('name'),
			x: event.clientX,
			y: event.clientY,
		})
	}

	const handleMouseLeave = () => {
		setHoveredProvince(undefined)
	}

	return (
		<>
			<NavBar />
			<div style={{ width: '100%', display: 'flex' }}>
				<div style={{ marginLeft: '50px' }}>
					<span
						style={{ fontSize: '50px', color: '#fff8dc' }}
					>{`${visitedProvinces.size}/${totalProvinceCount}`}</span>
				</div>
			</div>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<div
					ref={mapRef}
					onClick={handleClick}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					dangerouslySetInnerHTML={{ __html: turkiyeSvg }}
				/>
				{hoveredProvince && (
					<div
						className='province-tooltip'
						style={{
							position: 'fixed',
							left: hoveredProvince.x + 12,
							top: hoveredProvince.y + 12,
							pointerEvents: 'none',
						}}
					>
						{hoveredProvince.name}
					</div>
				)}
			</div>
			<Version />
		</>
	)
}
