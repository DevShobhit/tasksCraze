import {
  InputNumber,
  Input,
  Space,
  Select,
  Button,
  DatePicker,
  Tooltip,
  Divider,
} from 'antd'
import { FlagOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask, updateTask } from '../../../features/taskslice'

const Update = ({ item, toggleMode, isnew }) => {
  const [title, setTitle] = useState(!isnew ? item.title : '')
  // const [description, setDescription] = useState(!isnew ? item.description : '')
  const [pomo, setPomo] = useState(!isnew ? item.pomo : 5)
  const [priority, setPriority] = useState(!isnew ? item.priority : 2)
  const [dueDate, setDueDate] = useState(!isnew ? item.dueDate : new Date())

  const dispatch = useDispatch()

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  // const handleDescription = (e) => {
  //   setDescription(e.target.value)
  // }

  const handlePriority = (value) => {
    setPriority(value)
  }

  const handlePomo = (val) => {
    setPomo(val)
  }

  const handleSave = () => {
    !isnew
      ? dispatch(
          updateTask({
            title,
            // description,
            pomo,
            priority,
            dueDate,
            _id: item._id,
          })
        )
      : dispatch(
          createTask({
            title,
            // description,
            pomo,
            priority,
            dueDate,
            completed: false,
            completedPomo: 0,
          })
        )
    toggleMode()
  }

  const handleDateChange = (date) => {
    setDueDate(date.$d)
  }

  const disabledDate = (current) => {
    // Disable dates before today
    const currentDate = new Date()
    return current && current < currentDate.setHours(0, 0, 0, 0)
  }

  const handleDiscard = () => {
    toggleMode()
  }

  return (
    <>
      <Space>
        <Select
          defaultValue={2}
          bordered={false}
          onChange={handlePriority}
          value={priority}
          showArrow={false}
          size='middle'
          dropdownStyle={{ minWidth: '50px' }}
        >
          <Select.Option value={1}>
            <Tooltip title='High Priority' placement='right'>
              <FlagOutlined style={{ color: 'red' }} />
            </Tooltip>
          </Select.Option>
          <Select.Option value={2}>
            <Tooltip title='Medium Priority' placement='right'>
              <FlagOutlined style={{ color: 'orange' }} />
            </Tooltip>
          </Select.Option>
          <Select.Option value={3}>
            <Tooltip title='Low Priority' placement='right'>
              <FlagOutlined style={{ color: 'green' }} />
            </Tooltip>
          </Select.Option>
        </Select>
        <Divider type='vertical' />
        <Input
          placeholder='Task Title'
          value={title}
          onChange={handleTitle}
          bordered={false}
          style={{ width: '50vw' }}
        />
        {/* <Input
        placeholder='Description'
        value={description}
        onChange={handleDescription}
        bordered={false}
      /> */}

        <Divider type='vertical' />

        <InputNumber
          value={pomo}
          placeholder='pomo'
          min={1}
          style={{ width: '50px' }}
          bordered={false}
          onChange={handlePomo}
        />
        <Divider type='vertical' />

        <DatePicker
          placeholder='Due date'
          onChange={handleDateChange}
          disabledDate={disabledDate}
          style={{ width: '120px' }}
          bordered={false}
          allowClear={false}
        />
        <div>
          <Space>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleDiscard}>Discard</Button>
          </Space>
        </div>
      </Space>
    </>
  )
}

export default Update
