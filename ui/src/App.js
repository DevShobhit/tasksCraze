import Home from './pages/Home/Home'
import Dashboard from './pages/dashboard/dashboard'
import CompletedTasks from './pages/tasks/completedtasks'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TasksPage from './pages/tasks/tasks'
import TodayTasks from './pages/tasks/today'
import PlannedTasks from './pages/tasks/planned'
import StatsPage from './pages/Stats/stats'

const router = createBrowserRouter([
  {
    element: <Home />,
    children: [
      {
        path: '/',
        element: <TasksPage />,
      },
    ],
  },
  {
    element: <Dashboard />,
    children: [
      {
        path: '/completed',
        element: <CompletedTasks />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
      },
      {
        path: '/today',
        element: <TodayTasks />,
      },
      {
        path: '/planned',
        element: <PlannedTasks />,
      },
      {
        path: '/stats',
        element: <StatsPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
