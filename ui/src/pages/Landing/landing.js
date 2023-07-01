import { Layout } from 'antd'

import Navbar from '../../components/Navbar/Navbar'
import { Layout1 } from '../../components/Container'
import { HeroLeft, HeroRight } from './Hero'
import './landing.css'

const { Content } = Layout

const Landing = () => {
  return (
    <>
      <Layout
        style={{
          backgroundImage:
            'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Content
        // style={{ marginTop: '100px' }}
        >
          <Layout1 Left={HeroLeft} Right={HeroRight} />
        </Content>
      </Layout>
    </>
  )
}

export default Landing
