import { URLType, urls } from '../../../constants'
import { Link, Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'

export default function NavLayout() {
  const location = useLocation()

  const isActive = (url: URLType) => location.pathname === url.href
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-5">
          <NavBar />
          <Outlet />
        </div>
        <div className="drawer-side bg-primary/10">
          <div className="pl-20 p-4 pb-14">
            <Link to="/">
              <img className="max-w-[6rem]" src="/logo.svg" />
            </Link>
          </div>
          <ul>
            {urls.map((url) => (
              <li
                className={`py-2 my-4 transition-all border-l-4 ${
                  isActive(url) ? 'bg-white text-primary border-primary' : 'border-transparent'
                }`}
              >
                <Link className="px-16 pr-20" to={url.href}>
                  {url.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
