import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Header />

      <div className="min-h-[calc(100vh-64px)] px-2 pt-6 bg-[#e3eaef] overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
