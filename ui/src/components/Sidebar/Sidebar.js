import { Menu, Layout } from 'antd'
import { dark, light } from '../../utilities/theme/themeconfig'
import {
  LineChartOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  HistoryOutlined,
  InboxOutlined,
} from '@ant-design/icons'

const sidebarLinks = [
  { title: 'Today', path: '/today', icon: <InboxOutlined /> },
  { title: 'Stats', path: '/stats', icon: <LineChartOutlined /> },
  { title: 'Tasks', path: '/tasks', icon: <FileTextOutlined /> },
  { title: 'Completed', path: '/completed', icon: <FileDoneOutlined /> },
  { title: 'Planned', path: '/planned', icon: <HistoryOutlined /> },
]

const { Sider } = Layout

function Sidebar({ theme, collapsed, toggleSidebar }) {
  const renderSidebarLinks = () => {
    return sidebarLinks.map((link, index) => (
      <Menu.Item key={index} icon={link?.icon}>
        {link.title}
      </Menu.Item>
    ))
  }

  return (
    // Change the way sider is themed with better solution and store theme in db

    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleSidebar}
      theme={theme}
      // trigger={}
      width={200}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        paddingTop: '20px',
        backgroundColor: theme === 'dark' ? dark.Background : light.Background,
      }}
    >
      <Menu
        theme={theme}
        mode='inline'
        defaultSelectedKeys={['0']}
        style={{
          backgroundColor:
            theme === 'dark' ? dark.Background : light.Background,
        }}
      >
        {renderSidebarLinks()}
      </Menu>
    </Sider>
  )
}

export default Sidebar
