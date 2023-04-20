import { InputNumber, Input, Space, Button } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask, updateTask } from '../../../features/taskslice'

const Update = ({ item, toggleMode, isnew }) => {
  const [title, setTitle] = useState(!isnew ? item.title : '')
  const [description, setDescription] = useState(!isnew ? item.description : '')
  const [pomo, setPomo] = useState(!isnew ? item.pomo : 5)

  const dispatch = useDispatch()

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handlePomo = (val) => {
    setPomo(val)
  }

  const handleSave = () => {
    !isnew
      ? dispatch(
          updateTask({
            title,
            description,
            pomo,
            _id: item._id,
          })
        )
      : dispatch(
          createTask({
            title,
            description,
            pomo,
            completed: false,
            completedPomo: 0,
            priority: '1',
          })
        )
    toggleMode()
  }

  const handleDiscard = () => {
    toggleMode()
  }

  return (
    <>
      <Input
        placeholder='Task Title'
        value={title}
        onChange={handleTitle}
        bordered={false}
      />
      <Input
        placeholder='Description'
        value={description}
        onChange={handleDescription}
        bordered={false}
      />

      <InputNumber
        value={pomo}
        min={1}
        bordered={false}
        onChange={handlePomo}
      />
      <div>
        <Space>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleDiscard}>Discard</Button>
        </Space>
      </div>
    </>
  )
}

export default Update
