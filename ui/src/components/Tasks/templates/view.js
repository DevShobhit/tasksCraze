import renderpomo from '../pomo'
import { useSelector, useDispatch } from 'react-redux'
import { setActive, clearActive, updateTask } from '../../../features/taskslice'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { CircleIcon } from '../../../utilities/customIcons'
import { Space, Row, Col } from 'antd'

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
      <Row align='center' justify={'space-between'} gutter={30}>
        <Space>
          {/* Toggle Button to mark a task complete or incomplete */}
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

        <Col>
          <Row gutter={5}>
            <Col>
              <div>{item.title}</div>
            </Col>
            <Col>
              <div> {renderpomo(active, item.completedPomo, item.pomo)} </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default View
