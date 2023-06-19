import { Space, Switch, Form, Input } from 'antd'

function PomoSettings() {
  const [form] = Form.useForm()

  return (
    <>
      <Form layout='horizontal' form={form} style={{ maxWidth: '220px' }}>
        <Form.Item label='Pomodoro Length'>
          <Input style={{ marginLeft: '30px' }} placeholder='25' />
        </Form.Item>
        <Form.Item label='Short Break Length'>
          <Input style={{ marginLeft: '30px' }} placeholder='5' />
        </Form.Item>
        <Form.Item label='Long Break Length'>
          <Input style={{ marginLeft: '30px' }} placeholder='15' />
        </Form.Item>
        <Form.Item label='Long Break After'>
          <Input style={{ marginLeft: '30px' }} placeholder='4 Pomodoro' />
        </Form.Item>
      </Form>

      <Space direction='vertical' style={{ marginTop: '20px' }}>
        <Space size={60}>
          Auto Start Next Break
          <Switch />
        </Space>
        <Space size={30}>
          Auto Start Next Pomodoro
          <Switch />
        </Space>
      </Space>
    </>
  )
}

export default PomoSettings
