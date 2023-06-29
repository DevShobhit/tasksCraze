import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleOpen } from '../../features/settingslice'
import {
  Layout,
  Menu,
  Row,
  Col,
  Space,
  Avatar,
  Switch,
  Dropdown,
  Button,
} from 'antd'
import { dark, light } from '../../utilities/theme/themeconfig'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BulbOutlined,
} from '@ant-design/icons'

const { Header } = Layout

function Navbar({ theme, toggleTheme }) {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const toggleModalStatus = () => {
    dispatch(toggleOpen())
  }

  const overlayMenu = [
    {
      icon: <SettingOutlined />,
      title: 'Settings',
      onclick: toggleModalStatus,
    },
    {
      icon: <LogoutOutlined />,
      title: 'Logout',
      link: '/api/auth/logout',
    },
    {
      icon: <BulbOutlined />,
      title: 'Change Theme',
      extra: <Switch checked={theme === 'dark'} onChange={toggleTheme} />,
    },
  ]

  const menu = (
    <Menu>
      {overlayMenu.map((item, index) => (
        <Menu.Item key={index}>
          <Button
            block
            icon={item.icon}
            onClick={item.onclick}
            href={item?.link}
          >
            {item.title}
            {item?.extra}{' '}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      <Header
        style={{
          background: theme === 'dark' ? dark.Background : light.Background,
          position: 'fixed',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <Row justify={'space-between'} align='middle'>
          <Col>
            {/* Logo */}
            <Space
              direction='vertical'
              align='center'
              style={{ lineHeight: '1', verticalAlign: 'center' }}
            >
              <span style={{ fontSize: '25px' }}>⚡</span>
              <span style={{ fontSize: '18px' }}>
                <span
                  style={{ color: theme === 'dark' ? dark.Text : light.Text }}
                >
                  <b>T</b>asks
                </span>
                <span style={{ color: light.Primary }}>
                  <b>C</b>raze
                </span>
              </span>
            </Space>
          </Col>

          <Col>
            {user?.user?.name ? (
              <Space>
                <Dropdown overlay={menu} trigger={['click']}>
                  <Avatar
                    gap={20}
                    src={user?.user?.profilePicture}
                    icon={<UserOutlined />}
                  />
                </Dropdown>
                <Space>HI {user?.user?.name}</Space>
              </Space>
            ) : (
              <Button href='/api/auth/google'>Signin With Google</Button>
            )}
          </Col>
        </Row>
      </Header>
    </>
  )
}

export default Navbar
