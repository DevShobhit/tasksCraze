import { useState } from 'react'
import { Card, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import View from './view'
import Update from './update'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../../features/taskslice'

const Task = ({ item }) => {
  const [mode, setMode] = useState('view')
  const dispatch = useDispatch()

  const toggleMode = () => {
    setMode((mode) => (mode === 'edit' ? (mode = 'view') : (mode = 'edit')))
  }

  return (
    <>
      <Card>
        <Space align='center'>
          {mode === 'view' ? (
            <View item={item} />
          ) : (
            <Update item={item} toggleMode={toggleMode} />
          )}
          {mode === 'view' ? (
            <>
              <EditOutlined
                style={{ cursor: 'pointer' }}
                onClick={toggleMode}
              />
              <DeleteOutlined
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => dispatch(deleteTask(item._id))}
              />
            </>
          ) : (
            ''
          )}
        </Space>
      </Card>
    </>
  )
}

export default Task
