import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Card, Space } from 'antd'

ChartJS.register(ArcElement, Tooltip, Legend)

const StatsPage = () => {
  const [totalPomo, setTotalPomo] = useState(0)
  const [completedPomo, setCompletedPomo] = useState(0)

  const allTasks = useSelector((state) => state.tasks.items)
  const completedTasks = allTasks.filter((task) => task.completed === true)

  const TasksData = {
    labels: ['Completed Tasks', 'Remaining Tasks'],
    datasets: [
      {
        label: 'Tasks Count',
        data: [completedTasks.length, allTasks.length - completedTasks.length],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 2,
      },
    ],
  }

  const PomoData = {
    labels: ['Completed Pomo', 'Remaining Pomo'],
    datasets: [
      {
        label: 'Pomo Count',
        data: [completedPomo, totalPomo - completedPomo],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 2,
      },
    ],
  }

  useEffect(() => {
    let pomoCount = 0
    let completedPomoCount = 0

    allTasks.forEach((task) => {
      pomoCount += task.pomo
      completedPomoCount += task.completedPomo
    })

    setTotalPomo(pomoCount)
    setCompletedPomo(completedPomoCount)
  }, [totalPomo, completedPomo, allTasks])

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Space size='middle'>
          <Card
            style={{
              backgroundColor: '#efefef',
              fontWeight: 'bold',
              color: 'rgba(75, 192, 192, 1)',
            }}
            hoverable
          >
            Completed Tasks : {completedTasks.length}
          </Card>
          <Card
            style={{
              backgroundColor: '#efefef',
              fontWeight: 'bold',
              color: 'rgba(255, 159, 64, 1)',
            }}
            hoverable
          >
            Total Tasks : {allTasks.length}
          </Card>
          <Card
            style={{
              backgroundColor: '#efefef',
              fontWeight: 'bold',
              color: 'rgba(75, 192, 192, 1)',
            }}
            hoverable
          >
            Completed Pomo: {completedPomo}
          </Card>
          <Card
            style={{
              backgroundColor: '#efefef',
              fontWeight: 'bold',
              color: 'rgba(255, 159, 64, 1)',
            }}
            hoverable
          >
            Total Pomo: {totalPomo}
          </Card>
        </Space>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Space align='center'>
          <Card>
            <Pie style={{ height: '30vh' }} data={TasksData} />
          </Card>
          <Card>
            <Pie style={{ height: '30vh' }} data={PomoData} />
          </Card>
        </Space>
      </div>
    </>
  )
}

export default StatsPage
