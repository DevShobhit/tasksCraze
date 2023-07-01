import { Row, Col } from 'antd'

function TwoColContainer({ Left, Right }) {
  return (
    <div
      style={{
        margin: '20px',
        padding: '10px',
      }}
    >
      <Row gutter={[24, 12]} align={'middle'} justify={'center'} wrap={true}>
        <Col span={12} xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 0 }}>
          <Left />
        </Col>
        <Col span={12} xs={{ span: 24, order: 0 }} lg={{ span: 12, order: 1 }}>
          <Right />
        </Col>
      </Row>
    </div>
  )
}

export default TwoColContainer
