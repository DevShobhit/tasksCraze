import { useSelector } from 'react-redux'
import Task from '../../components/Tasks/templates/task'

const PlannedTasks = () => {
  const allTasks = useSelector((state) => state.tasks.items)
  const plannedTasks = allTasks.filter((task) => task.dueDate > new Date())

  return (
    <>
      {plannedTasks.map((task) => (
        <Task key={task._id} item={task} />
      ))}
    </>
  )
}

export default PlannedTasks
