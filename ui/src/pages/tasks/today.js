import { useSelector } from 'react-redux'
import Task from '../../components/Tasks/templates/task'

const TodayTasks = () => {
  const allTasks = useSelector((state) => state.tasks.items)
  const today = new Date()
  const todayTasks = allTasks.filter(
    (task) => task.dueDate?.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
  )

  return (
    <>
      {todayTasks.map((task) => (
        <Task key={task._id} item={task} />
      ))}
    </>
  )
}

export default TodayTasks
