import React, { useState, useEffect } from 'react'
import './Timer.css'

const Timer = (props) => {

	const {
		initialMinute = 0,
		initialSeconds = 0,
		initialRunning = false
	} = props

	const [minutes, setMinutes] = useState(initialMinute)
	const [seconds, setSeconds] = useState(initialSeconds)
	const [running, setRunning] = useState(initialRunning)

	const start = () => setRunning(true)
	const pause = () => setRunning(false)
	const reset = () => {
		setMinutes(initialMinute)
		setSeconds(initialSeconds)
	}
	const stop = () => {
		pause()
		reset()
	}

	useEffect(() => {
		if (running) {
			const myInterval = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1)
				}
				if (seconds === 0) {
					if (minutes === 0) {
						clearInterval(myInterval)
					} else {
						setMinutes(minutes - 1)
						setSeconds(59)
					}
				}
			}, 1000)
			return () => {
				clearInterval(myInterval)
			}
		}
	})

	return (
		<div className='timer'>
			<h1 className='timer-display'>
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</h1>
			<p className='timer-control'>
				<button className="timer-button-primary" onClick={() => running ? pause() : start()}>
					{running ? "Pause" : "Start"}
				</button>
				<button onClick={stop}>Reset</button>
			</p>
		</div>
	)
}

export default Timer