import { RouterProvider } from 'react-router-dom'
import { CompanyProvider } from './context/company-provider'
import { router } from './routes'
import './styles/global.css'

export function App() {
  return (
    <CompanyProvider>
      <RouterProvider router={router} />
    </CompanyProvider>
  )
}
