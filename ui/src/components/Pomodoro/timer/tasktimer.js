import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask, clearActive } from '../../../features/taskslice'

function TimerDisplay({ remaining }) {
  const minutes = parseInt(remaining / 60)
  const seconds = remaining % 60
  const display =
    (minutes <= 9 ? '0' + minutes : minutes) +
    ' : ' +
    (seconds <= 9 ? '0' + seconds : seconds)
  return <>{display}</>
}

function TaskTimer({ duration, running, id, completedPomo }) {
  const [remaining, setRemaining] = useState(duration * 60)
  const [timer, setTimer] = useState(null)
  const dispatch = useDispatch()

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setRemaining((remaining) => remaining - 1)
      }, 1000)
    )
  }
  const pauseTimer = () => {
    clearInterval(timer)
  }

  useEffect(() => {
    if (running) startTimer()
    if (!running) pauseTimer()
  }, [running])

  useEffect(() => {
    if (remaining <= 0) {
      setRemaining(duration * 60)
      pauseTimer()
      dispatch(clearActive())
      dispatch(updateTask({ _id: id, completedPomo: completedPomo + 1 }))
      // TODO: Handle Notification
      // const notification = new Notification('Focus Pomodoro', {
      //   body: 'Good Work on completing Pomodoro. Keep Going!',
      // })
    }
  }, [remaining])

  return (
    <>
      <TimerDisplay remaining={remaining} />
    </>
  )
}

export default TaskTimer
