import { useSelector } from 'react-redux'
import Task from '../../components/Tasks/templates/task'

function CompletedTasks() {
  const allTasks = useSelector((state) => state.tasks.items)
  const completedTasks = allTasks.filter((task) => task.completed === true)

  return (
    <>
      {completedTasks.map((task) => (
        <Task key={task._id} item={task} />
      ))}
    </>
  )
}

export default CompletedTasks
