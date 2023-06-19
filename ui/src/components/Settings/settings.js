import { useState } from 'react'
import { Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { toggleOpen } from '../../features/settingslice'
import { Button, Space, Menu, Layout } from 'antd'
import { ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import PomoSettings from './pomoSettings'
import About from './about'

const { Content, Sider } = Layout

const sidebarLinks = [
  { title: 'Pomodoro Timer', path: '/today', icon: <ClockCircleOutlined /> },
  { title: 'About', path: '/stats', icon: <InfoCircleOutlined /> },
]

const Settings = () => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector((state) => state.settings.isOpen)
  const [selectedKey, setSelectedKey] = useState('0')

  const toggleModalStatus = () => {
    dispatch(toggleOpen())
  }

  const changeSelectedKey = (currentKey) => {
    setSelectedKey(currentKey)
  }

  const renderSidebarLinks = () => {
    return sidebarLinks.map((link, index) => (
      <Menu.Item key={index} icon={link?.icon}>
        {link.title}
      </Menu.Item>
    ))
  }

  return (
    <>
      <Modal
        title={'Settings'}
        open={isModalOpen}
        style={{
          top: '30px',
        }}
        onCancel={() => toggleModalStatus()}
        footer={null}
        width={'50vw'}
      >
        <Layout style={{ height: '80vh' }}>
          <Sider width={150} style={{ backgroundColor: '#fefefe' }}>
            <Menu
              mode='inline'
              defaultSelectedKeys={[selectedKey]}
              onSelect={({ key }) => changeSelectedKey(key)}
            >
              {renderSidebarLinks()}
            </Menu>
          </Sider>
          <Content
            style={{
              borderRadius: '10px',
              marginLeft: '50px',
              padding: '30px',
            }}
          >
            {selectedKey == 0 ? <PomoSettings /> : <About />}
          </Content>
        </Layout>
      </Modal>
    </>
  )
}

export default Settings
