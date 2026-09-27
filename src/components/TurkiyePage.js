import React, { useEffect, useRef, useState } from 'react'
import NavBar from './NavBar'
import turkiyeSvgUrl from '../images/turkiye.svg'
import '../css/Turkiye.css'
import Version from './Version'
import { toast } from 'react-toastify'

export default function TurkiyePage() {
	const visitedProvincesStorageKey = 'VisitedProvinces'
	const totalProvinceCount = 81

	const [turkiyeSvg, setTurkiyeSvg] = useState('')
	const [visitedProvinces, setVisitedProvinces] = useState(new Set())
	const [hoveredProvince, setHoveredProvince] = useState()
	const [canHover, setCanHover] = useState(true)

	const mapRef = useRef(null)

	useEffect(() => {
		async function loadAsync() {
			const turkiyeSvgResponse = await fetch(turkiyeSvgUrl)
			const turkiyeSvgText = await turkiyeSvgResponse.text()
			setTurkiyeSvg(turkiyeSvgText)
		}
		loadAsync()
		const mediaQuery = window.matchMedia('(hover: hover)')
		setCanHover(mediaQuery.matches)
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

		const provinceName = path.getAttribute('name')
		const wasVisited = visitedProvinces.has(path.id)
		const next = new Set(visitedProvinces)
		if (wasVisited) {
			next.delete(path.id)
		} else {
			next.add(path.id)
		}
		setVisitedProvinces(next)
		localStorage.setItem(
			visitedProvincesStorageKey,
			JSON.stringify(Array.from(next)),
		)
		if (wasVisited) {
			toast.error(`${provinceName} has been removed from your visited list`)
		} else {
			toast.success(`${provinceName} has been added to your visited list`)
		}
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
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<div>
					<span
						style={{
							fontSize: 'clamp(30px, 5vw, 50px)',
							color: '#fff8dc',
						}}
					>{`${visitedProvinces.size}/${totalProvinceCount}`}</span>
				</div>
			</div>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<div
					ref={mapRef}
					onClick={handleClick}
					onMouseMove={canHover ? handleMouseMove : undefined}
					onMouseLeave={canHover ? handleMouseLeave : undefined}
					dangerouslySetInnerHTML={{ __html: turkiyeSvg }}
					className='map-container'
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
