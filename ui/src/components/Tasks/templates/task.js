import { useState } from 'react'
import { Card, Row, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import View from './view'
import Update from './update'
import renderpomo from '../pomo'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../../../features/taskslice'

const Task = ({ item }) => {
  const [mode, setMode] = useState('view')
  const activeTask = useSelector((state) => state.tasks.activeTask)
  const active = item._id === activeTask
  const dispatch = useDispatch()

  const toggleMode = () => {
    setMode((mode) => (mode === 'edit' ? (mode = 'view') : (mode = 'edit')))
  }

  return (
    <>
      <Card
        style={{
          marginBottom: '10px',
        }}
      >
        <Row align='center' justify={'space-between'}>
          {mode === 'view' ? (
            <View item={item} />
          ) : (
            <Update item={item} toggleMode={toggleMode} />
          )}

          {mode === 'view' ? (
            <Space size={'large'}>
              {renderpomo(active, item.completedPomo, item.pomo)}
              <Space>
                <EditOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={toggleMode}
                />
                <DeleteOutlined
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() => dispatch(deleteTask(item._id))}
                />
              </Space>
            </Space>
          ) : (
            ''
          )}
        </Row>
      </Card>
    </>
  )
}

export default Task
