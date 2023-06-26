import { fetchUser } from '../../features/userslice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dashboard from '../dashboard/dashboard'
import Landing from '../Landing/landing'

const Home = () => {
  const user = useSelector((state) => state.user.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return <>{user?.user?.name ? <Dashboard /> : <Landing />}</>
}

export default Home
