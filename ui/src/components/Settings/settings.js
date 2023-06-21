import { useState } from 'react'
import { Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { toggleOpen } from '../../features/settingslice'
import { updatePomoSettings } from '../../features/pomoslice'
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

  // Pomodoro Settings
  const pomoDur = useSelector((state) => state.pomo.pomoDur)
  const shortBreakDur = useSelector((state) => state.pomo.shortBreakDur)
  const longBreakDur = useSelector((state) => state.pomo.longBreakDur)
  const longBreakAfter = useSelector((state) => state.pomo.longBreakAfter)
  const autoStartBreak = useSelector((state) => state.pomo.autoStartBreak)
  const autoStartNextPomo = useSelector((state) => state.pomo.autoStartNextPomo)

  const [selectedKey, setSelectedKey] = useState('0')

  const [pomoSettings, setPomoSettings] = useState({
    pomoDur,
    shortBreakDur,
    longBreakDur,
    longBreakAfter,
    autoStartBreak,
    autoStartNextPomo,
  })

  function handlePomoSettingsChange(setting) {
    setPomoSettings({ ...pomoSettings, ...setting })
  }

  const toggleModalStatusAndSaveChanges = () => {
    dispatch(toggleOpen())
    dispatch(updatePomoSettings(pomoSettings))
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
        onCancel={() => toggleModalStatusAndSaveChanges()}
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
            {selectedKey == 0 ? (
              <PomoSettings
                pomoSettings={pomoSettings}
                handlePomoSettingsChange={handlePomoSettingsChange}
              />
            ) : (
              <About />
            )}
          </Content>
        </Layout>
      </Modal>
    </>
  )
}

export default Settings
