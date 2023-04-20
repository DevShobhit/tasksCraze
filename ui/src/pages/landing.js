import { Button } from 'antd'
import axios from 'axios'
import { fetchUser } from '../features/userslice'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideImg from '../utilities/images/side.jpg'
import { Layout, Space, Divider, Row, Col } from 'antd'
import './landing.css'
import Navbar from '../components/Navbar/Navbar'
import Tasks from '../components/Tasks/Tasks'
const { Content } = Layout

const Landing = () => {
  const user = useSelector((state) => state.user.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <>
      <Layout
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Content style={{ background: 'transparent' }}>
          {user?.user?.name ? (
            <Tasks />
          ) : (
            <Row justify={'space-around'} align={'middle'}>
              <Col>
                <Space direction='vertical'>
                  <div style={{ fontSize: '20px', color: '#333' }}>
                    Be{' '}
                    <span style={{ fontSize: '80px' }}>
                      <b>Crazy</b>
                    </span>{' '}
                    about your
                    <span style={{ fontSize: '30px' }}>
                      <b>Tasks</b>
                    </span>
                  </div>
                  <div style={{ fontSize: '20px', color: '#333' }}>
                    Be
                    <span style={{ fontSize: '30px' }}>
                      <b>Crazy</b>
                    </span>{' '}
                    about your{' '}
                    <span style={{ fontSize: '60px' }}>
                      <b>Goals</b>
                    </span>
                  </div>
                  <div style={{ fontSize: '20px', color: '#333' }}>
                    Be{' '}
                    <span style={{ fontSize: '40px' }}>
                      <b>Crazy</b>
                    </span>{' '}
                    about utilising your{' '}
                    <span style={{ fontSize: '80px' }}>
                      <b>Time</b>
                    </span>
                  </div>
                </Space>
                <Button
                  size='large'
                  href='/api/auth/google'
                  className='btn-gradient'
                >
                  Signin With Google
                </Button>
              </Col>
              <Col>
                <img
                  src={SideImg}
                  style={{ width: '400px', height: 'auto' }}
                  alt='Sand Timer Image'
                />
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    </>
  )
}

export default Landing
