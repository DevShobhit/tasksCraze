// import renderpomo from '../pomo'
import { useSelector, useDispatch } from 'react-redux'
import { setActive, clearActive, updateTask } from '../../../features/taskslice'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  FlagOutlined,
} from '@ant-design/icons'
import { CircleIcon } from '../../../utilities/customIcons'
import { Space } from 'antd'

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
      <Space align='center' size={'large'}>
        {
          <FlagOutlined
            style={{
              color:
                item.priority === 1
                  ? 'red'
                  : item.priority === 2
                  ? 'orange'
                  : 'green',
            }}
          />
        }
        {/* Toggle Button to mark a task complete or incomplete */}
        <Space size={'small'}>
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

          {/* Button to start or pause the timer */}
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
        </Space>
        <div>{item.title}</div>
      </Space>
    </>
  )
}

export default View
