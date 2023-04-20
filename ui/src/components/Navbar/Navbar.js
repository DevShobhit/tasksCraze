import React from 'react'
import { useSelector } from 'react-redux'
import { Layout, Row, Col, Space, Button, Divider } from 'antd'
const { Header } = Layout

function Navbar() {
  const user = useSelector((state) => state.user.user)

  return (
    <>
      <Header style={{ background: 'transparent' }}>
        <Row justify={'space-between'}>
          <Col style={{ fontSize: '22px' }}>
            <b>T</b>asks<b>C</b>raze
          </Col>
          <Col>
            {user?.name ? 'HI' : ''}
            {user?.user?.name ? (
              <Space>
                <Space>{user?.user?.name}</Space>
                <Button type='primary' href='/api/auth/logout'>
                  SignOut
                </Button>
              </Space>
            ) : (
              <Button href='/api/auth/google'>Signin With Google</Button>
            )}
          </Col>
        </Row>
      </Header>
      <Divider />
    </>
  )
}

export default Navbar
