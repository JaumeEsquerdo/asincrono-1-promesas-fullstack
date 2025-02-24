import { Outlet} from 'react-router'
import '@/css/index.css'
import {Header} from '@/components/Header'

function Layout() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout;
