import { useSelector } from 'react-redux'
import TaskTimer from './tasktimer'
// import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Layout, Space } from 'antd'
const { Content } = Layout

const TimerRunner = () => {
  const activeTask = useSelector((state) => state.tasks.activeTask)
  const tasks = useSelector((state) => state.tasks.items)
  const breakStatus = useSelector((state) => state.pomo.breakStatus)
  const dispatch = useDispatch()

  const currentTask = tasks.filter((task) => task._id === activeTask)[0]

  return (
    <>
      <Layout
        style={{
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Space align='center' style={{ fontSize: '35px', fontWeight: '600' }}>
          {breakStatus === 'active' ? ' Break ' : currentTask.title}
        </Space>
        <Content
          style={{
            margin: '40px',
          }}
        >
          <TaskTimer
            duration={1}
            running={activeTask !== null}
            id={currentTask._id}
            completedPomo={currentTask.completedPomo}
          />
        </Content>
      </Layout>
    </>
  )
}

export default TimerRunner
