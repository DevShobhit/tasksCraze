import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTask, clearActive } from '../../../features/taskslice'
import {
  startTimer,
  pauseTimer,
  resetTimer,
  updateTimeRemaining,
  updatePomoStatus,
  resetPomoStatus,
  increaseBreakCounts,
  resetBreakCounts,
} from '../../../features/pomoslice'
import { Progress, Button, Space } from 'antd'

function TimerDisplay({ remaining, totalDur = 60 }) {
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
        percent={(remaining / totalDur) * 100}
        format={() => display}
        size={450}
        strokeColor={(remaining / totalDur) * 100 < 20 ? 'red' : 'green'}
        trailColor={'#ccc'}
      />
    </>
  )
}

function TaskTimer({ isTaskActive, id, completedPomo, totalPomo }) {
  const duration = useSelector((state) =>
    state.pomo.pomoStatus === 'active'
      ? state.pomo.pomoDur * 60
      : state.pomo.pomoStatus === 'shortBreak'
      ? state.pomo.shortBreakDur * 60
      : state.pomo.longBreakDur * 60
  )
  const remaining = useSelector((state) =>
    parseInt(state.pomo.timeRemaining * 60)
  )
  const isPomoActive = useSelector((state) => state.pomo.isRunning)
  const autobreak = useSelector((state) => state.pomo.autoStartBreak)
  const autoStartNextPomo = useSelector((state) => state.pomo.autoStartNextPomo)
  const pomoStatus = useSelector((state) => state.pomo.pomoStatus)
  const breaksConsumed = useSelector((state) => state.pomo.breakCounts)
  const longBreakAfter = useSelector((state) => state.pomo.longBreakAfter)
  // const [timer, setTimer] = useState(null)
  const dispatch = useDispatch()

  const startTask = () => {
    if (!isPomoActive) {
      dispatch(startTimer())
    }
  }

  const pauseTask = () => {
    dispatch(pauseTimer())
  }

  useEffect(() => {
    let intervalId

    if (isPomoActive) {
      intervalId = setInterval(() => {
        if (remaining > 0) {
          dispatch(updateTimeRemaining((remaining - 1) / 60))
        } else {
          clearInterval(intervalId)
          pomoStatus === 'active' &&
            dispatch(updateTask({ _id: id, completedPomo: completedPomo + 1 }))

          !autobreak && dispatch(clearActive())
          completedPomo === totalPomo && dispatch(clearActive())

          if (!autoStartNextPomo && pomoStatus !== 'active') {
            dispatch(clearActive())
            dispatch(resetTimer('active'))
            dispatch(resetPomoStatus('active'))
          }

          // dispatch(pauseTimer())

          if (autobreak === true && pomoStatus !== 'active') {
            dispatch(increaseBreakCounts())
            if (breaksConsumed === longBreakAfter) {
              dispatch(resetBreakCounts())
            }
          }

          autobreak
            ? dispatch(
                resetTimer(
                  pomoStatus !== 'active'
                    ? 'active'
                    : breaksConsumed < longBreakAfter
                    ? 'shortBreak'
                    : 'longBreak'
                )
              )
            : resetTimer('active')

          autobreak &&
            dispatch(
              pomoStatus !== 'active'
                ? updatePomoStatus('active')
                : breaksConsumed < longBreakAfter
                ? updatePomoStatus('shortBreak')
                : updatePomoStatus('longBreak')
            )
        }
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [
    dispatch,
    remaining,
    isPomoActive,
    completedPomo,
    id,
    longBreakAfter,
    pomoStatus,
    totalPomo,
    autoStartNextPomo,
    autobreak,
    breaksConsumed,
  ])

  useEffect(() => {
    if (isTaskActive) dispatch(startTimer())
    if (!isTaskActive) dispatch(pauseTimer())
  }, [isTaskActive, dispatch])

  // TODO: Handle Notification
  // const notification = new Notification('Focus Pomodoro', {
  //   body: 'Good Work on completing Pomodoro. Keep Going!',
  // })

  return (
    <>
      <Space direction='vertical' size={40} align='center'>
        <TimerDisplay remaining={remaining} totalDur={duration} />

        {isPomoActive ? (
          <Button onClick={() => pauseTask()}> Pause</Button>
        ) : (
          <Space>
            <Button onClick={() => startTask()}> Continue</Button>
            <Button
              onClick={() => {
                dispatch(resetTimer('active'))
                dispatch(clearActive())
                dispatch(resetPomoStatus())
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
