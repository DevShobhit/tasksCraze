import Tasks from '../../components/Tasks/Tasks'
import Update from '../../components/Tasks/templates/update'
import { Button } from 'antd'
import { useState } from 'react'

function TasksPage() {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <div style={{ textAlign: 'end', margin: '10px 30px' }}>
        {open ? (
          <Update isnew='true' toggleMode={toggleOpen} />
        ) : (
          <Button onClick={toggleOpen}>Create New Task</Button>
        )}
      </div>
      <div style={{ padding: 24 }}>
        <Tasks />
      </div>
    </>
  )
}

export default TasksPage
