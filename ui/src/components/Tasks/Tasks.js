import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import Task from './templates/task'
import Update from './templates/update'
import { fetchTasks, updateOrder } from '../../features/taskslice'
import TimerRunner from '../Pomodoro/timer/timerrunner'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { List, Card } from 'antd'

const NormalView = () => {
  const [open, setOpen] = useState(false)
  const tasks = useSelector((state) => state.tasks.items)
  const dispatch = useDispatch()

  const handleDragEnd = (res) => {
    if (!res.destination) return

    const { source, destination } = res

    const reorderedTasks = Array.from(tasks)
    const [draggedTask] = reorderedTasks.splice(source.index, 1)
    reorderedTasks.splice(destination.index, 0, draggedTask)
    dispatch(updateOrder(reorderedTasks))
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  return (
    <>
      {open ? (
        <Update isnew='true' toggleMode={toggleOpen} />
      ) : (
        <Button onClick={toggleOpen}>Create New Task</Button>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='task-list'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task item={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

function Tasks() {
  const runnerstatus = useSelector((state) => state.tasks.activeTask)

  // return <NormalView />

  return <>{runnerstatus ? <TimerRunner /> : <NormalView />}</>
}

export default Tasks
