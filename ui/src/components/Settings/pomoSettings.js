import { useState } from 'react'
import { Space, Switch, Form, InputNumber } from 'antd'

function PomoSettings({ pomoSettings, handlePomoSettingsChange }) {
  const [form] = Form.useForm()

  function handleSettingsChange(setting) {
    handlePomoSettingsChange({ ...pomoSettings, ...setting })
  }

  return (
    <>
      <Form layout='horizontal' form={form} style={{ maxWidth: '220px' }}>
        <Form.Item label='Pomodoro Length'>
          <InputNumber
            style={{ marginLeft: '30px' }}
            placeholder='25'
            min={15}
            max={45}
            value={pomoSettings.pomoLength}
            onChange={(val) => handleSettingsChange({ pomoDur: val })}
            defaultValue={25}
          />
        </Form.Item>
        <Form.Item label='Short Break Length'>
          <InputNumber
            style={{ marginLeft: '30px' }}
            placeholder='5'
            min={1}
            max={10}
            value={pomoSettings.shortBreakDur}
            onChange={(val) => handleSettingsChange({ shortBreakDur: val })}
            defaultValue={5}
          />
        </Form.Item>
        <Form.Item label='Long Break Length'>
          <InputNumber
            style={{ marginLeft: '30px' }}
            placeholder='15'
            min={10}
            max={40}
            value={pomoSettings.longBreakDur}
            onChange={(val) => handleSettingsChange({ longBreakDur: val })}
            defaultValue={15}
          />
        </Form.Item>
        <Form.Item label='Long Break After'>
          <InputNumber
            style={{ marginLeft: '30px' }}
            value={pomoSettings.longBreakAfter}
            placeholder='4 Pomodoro'
            min={2}
            max={8}
            onChange={(val) => handleSettingsChange({ longBreakAfter: val })}
            defaultValue={4}
          />
        </Form.Item>
      </Form>

      <Space direction='vertical' style={{ marginTop: '20px' }}>
        <Space size={60}>
          Auto Start Next Break
          <Switch
            checked={pomoSettings.autoStartNextBreak}
            onClick={() =>
              handleSettingsChange({
                autoStartBreak: !pomoSettings.autoStartBreak,
              })
            }
          />
        </Space>
        <Space size={30}>
          Auto Start Next Pomodoro
          <Switch
            checked={pomoSettings.autoStartNextPomo}
            onClick={() =>
              handleSettingsChange({
                autoStartNextPomo: !pomoSettings.autoStartNextPomo,
              })
            }
          />
        </Space>
      </Space>
    </>
  )
}

export default PomoSettings
