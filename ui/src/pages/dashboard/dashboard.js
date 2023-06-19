import { Layout } from 'antd'
import Sidebar from '../../components/Sidebar/Sidebar'
import { ConfigProvider } from 'antd'
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TasksPage from '../tasks/tasks'
import Settings from '../../components/Settings/settings'

const { Content } = Layout

function Dashboard() {
  // TODO: Notification Implementation
  // const requestPermission = () => {
  //   Notification.requestPermission().then((res) => {
  //     console.log(res)
  //   })
  // }

  const [theme, setTheme] = useState('light')
  const [collapsed, setCollapsed] = useState(false)

  const handleThemeChange = (checked) => {
    setTheme(checked ? 'dark' : 'light')
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff9146',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }} hasSider>
        <Navbar theme={theme} toggleTheme={handleThemeChange} />
        <Sidebar
          theme={theme}
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
        />
        <Layout style={{ marginLeft: collapsed ? 80 : 200, marginTop: 60 }}>
          <Content style={{ margin: '16px' }}>
            <TasksPage />
            <Settings />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default Dashboard
