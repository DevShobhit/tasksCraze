import { useState } from 'react'
import renderpomo from '../pomo'
import TaskTimer from '../../Pomodoro/timer/tasktimer'
import { useSelector, useDispatch } from 'react-redux'
import { setActive, clearActive, updateTask } from '../../../features/taskslice'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  BorderOutlined,
} from '@ant-design/icons'
import { CircleIcon } from '../../../utilities/customIcons'
import { Space, Checkbox } from 'antd'

const View = ({ item }) => {
  const activeTask = useSelector((state) => state.tasks.activeTask)
  const active = item._id === activeTask
  const dispatch = useDispatch()

  const startTask = () => {
    dispatch(setActive(item._id))
  }

  const stopTask = () => {
    dispatch(clearActive())
  }

  return (
    <>
      <Space align='center'>
        {item.completed ? (
          <CheckCircleOutlined
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={() =>
              dispatch(updateTask({ _id: item._id, completed: false }))
            }
          />
        ) : (
          <CircleIcon
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={() =>
              dispatch(updateTask({ _id: item._id, completed: true }))
            }
          />
        )}
        {active ? (
          <PauseCircleOutlined
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={stopTask}
          />
        ) : (
          <PlayCircleOutlined
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={startTask}
          />
        )}
        <Space direction='vertical'>
          <div>{item.title}</div>
          <div> {renderpomo(active, item.completedPomo, item.pomo)} </div>
          <TaskTimer
            duration={1}
            running={active}
            id={item._id}
            completedPomo={item.completedPomo}
          />
        </Space>
      </Space>
    </>
  )
}

export default View
