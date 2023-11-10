import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './styles/main.css'
import ErrorBoundary from './components/ErrorBoundary'
import Pool from './pages/Pool'
import Lend from './pages/Lend'
import Borrow from './pages/Borrow'
import { NavLayout } from './components'
import Activity from './pages/Activity'

const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/pool',
        element: <Pool />,
      },
      {
        path: '/lend',
        element: <Lend />,
      },
      {
        path: '/borrow',
        element: <Borrow />,
      },
      {
        path: '/activity',
        element: <Activity />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
)
