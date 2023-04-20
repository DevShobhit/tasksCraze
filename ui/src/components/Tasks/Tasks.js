import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import Task from './templates/task'
import Update from './templates/update'
import { fetchTasks } from '../../features/taskslice'

function Tasks() {
  const [open, setOpen] = useState(false)
  const tasks = useSelector((state) => state.tasks.items)
  const dispatch = useDispatch()

  const toggleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  return (
    <>
      {tasks.map((task, index) => {
        return (
          <div key={index}>
            <Task item={task} />
          </div>
        )
      })}

      {open ? (
        <Update isnew='true' toggleMode={toggleOpen} />
      ) : (
        <Button onClick={toggleOpen}>Create New Task</Button>
      )}
    </>
  )
}

export default Tasks
