import Navbar from '../../components/Navbar/Navbar'
import Layout, { Content } from 'antd/es/layout/layout'
import Tasks from '../../components/Tasks/Tasks'

function Dashboard() {
  // TODO: Notification Implementation
  // const requestPermission = () => {
  //   Notification.requestPermission().then((res) => {
  //     console.log(res)
  //   })
  // }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ margin: '30px' }}>
        <Tasks />
        {/* <Button onClick={requestPermission}>Request</Button> */}
      </Content>
    </Layout>
  )
}

export default Dashboard
