import { useSelector } from 'react-redux'
import TaskTimer from './tasktimer'
import { Layout, Space } from 'antd'
const { Content } = Layout

const TimerRunner = () => {
  const activeTask = useSelector((state) => state.tasks.activeTask)
  const tasks = useSelector((state) => state.tasks.items)
  const pomoStatus = useSelector((state) => state.pomo.pomoStatus)

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
          {pomoStatus === 'active'
            ? currentTask.title
            : pomoStatus === 'shortBreak'
            ? 'Short Break'
            : 'Long Break'}
        </Space>
        <Content
          style={{
            margin: '40px',
          }}
        >
          <TaskTimer
            isTaskActive={activeTask !== null}
            id={currentTask._id}
            completedPomo={currentTask.completedPomo}
            totalPomo={currentTask.pomo}
          />
        </Content>
      </Layout>
    </>
  )
}

export default TimerRunner
