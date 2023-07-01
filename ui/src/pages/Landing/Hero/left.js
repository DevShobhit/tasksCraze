import { Typography, Button } from 'antd'

const { Title } = Typography

function HeroLeft() {
  return (
    <div style={{ marginLeft: '30px' }}>
      <Title style={{ fontSize: '110px', color: 'tomato' }}>Be Focused!</Title>
      <Title style={{ fontSize: '80px', marginTop: 0 }}>
        Work on Tasks that matters the most.
      </Title>
      <Button
        size='large'
        href='/api/auth/google'
        style={{
          marginTop: '20px',
          color: '#efefef',
          backgroundColor: 'tomato',
        }}
      >
        Get Started
      </Button>
    </div>
  )
}

export default HeroLeft
