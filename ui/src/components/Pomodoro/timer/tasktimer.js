import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTask, clearActive } from '../../../features/taskslice'
import {
  startTimer,
  pauseTimer,
  resetTimer,
  updateTimeRemaining,
  updateBreakStatus,
} from '../../../features/pomoslice'
import { Progress, Button, Space } from 'antd'

function TimerDisplay({ remaining, totaldur = 60 }) {
  const minutes = parseInt(remaining / 60)
  const seconds = remaining % 60
  const display =
    (minutes <= 9 ? '0' + minutes : minutes) +
    ' : ' +
    (seconds <= 9 ? '0' + seconds : seconds)
  return (
    <>
      <Progress
        type='circle'
        percent={(remaining / totaldur) * 100}
        format={() => display}
        size={450}
        strokeColor={(remaining / totaldur) * 100 < 20 ? 'red' : 'green'}
        trailColor={'#ccc'}
      />
    </>
  )
}

function TaskTimer({ running, id, completedPomo }) {
  const remaining = useSelector((state) => state.pomo.timeRemaining)
  const isrunning = useSelector((state) => state.pomo.isRunning)
  const breakStatus = useSelector((state) => state.pomo.breakStatus)
  // const [timer, setTimer] = useState(null)
  const dispatch = useDispatch()

  const startTask = () => {
    if (!isrunning) {
      dispatch(startTimer())
    }
  }

  useEffect(() => {
    let intervalId

    if (isrunning) {
      intervalId = setInterval(() => {
        if (remaining > 0) {
          dispatch(updateTimeRemaining(remaining - 1))
        } else {
          clearInterval(intervalId)
          dispatch(pauseTimer())
        }
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [dispatch, remaining, isrunning])

  const pauseTask = () => {
    dispatch(pauseTimer())
  }

  useEffect(() => {
    if (running) startTask()
    if (!running) pauseTask()
  }, [running])

  useEffect(() => {
    if (remaining <= 0) {
      dispatch(resetTimer())
      pauseTask()
      dispatch(clearActive())
      breakStatus === 'inactive' &&
        dispatch(updateTask({ _id: id, completedPomo: completedPomo + 1 }))
      breakStatus === 'active'
        ? dispatch(updateBreakStatus('inactive'))
        : dispatch(updateBreakStatus('active'))

      // TODO: Handle Notification
      // const notification = new Notification('Focus Pomodoro', {
      //   body: 'Good Work on completing Pomodoro. Keep Going!',
      // })
    }
  }, [remaining])

  return (
    <>
      <Space direction='vertical' size={40} align='center'>
        <TimerDisplay remaining={remaining} />

        {isrunning ? (
          <Button onClick={() => pauseTask()}> Pause</Button>
        ) : (
          <Space>
            <Button onClick={() => startTask()}> Continue</Button>
            <Button
              onClick={() => {
                dispatch(resetTimer())
                dispatch(clearActive())
              }}
            >
              {' '}
              Stop
            </Button>
          </Space>
        )}
      </Space>
    </>
  )
}

export default TaskTimer
