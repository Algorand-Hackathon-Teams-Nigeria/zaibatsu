import { SOCIAL_LINKS, QUICK_LINKS, COMMUNITY_LINKS } from "@constants/navigation/footer"
import { Logo } from "@components/atoms"
import { Link } from "@remix-run/react"

const LandingPageFooter = () => {
  return (
    <footer className="border-t font-inter p-2 pt-20 md:p-20 mt-48 md:mt-56 flex flex-col gap-20">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="flex flex-col gap-6">
          <Logo className="w-[153px] mb-4" />
          <p className="md:max-w-[370px]">Join our Discord channel or follow us on Twitter to keep up to date with our latest work and announcements.</p>
          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, ...item }) => (
              <Link to={item.href} key={item.name}>{<Icon size={24} />}</Link>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-2xl">Quick Link</h4>
            <ul className="flex flex-col transition-all gap-2 text-black/80">
              {QUICK_LINKS.map(link => (
                <Link className="hover:text-black" to={link.href} key={link.name}>{link.name}</Link>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-2xl">Community</h4>
            <ul className="flex flex-col transition-all gap-2 text-black/80">
              {COMMUNITY_LINKS.map(link => (
                <Link className="hover:text-black" to={link.href} key={link.name}>{link.name}</Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col w-full md:flex-row justify-between">
        <p>Copyright <span>&#169;</span> {new Date().getFullYear()} Zaibatsu All Rights Reserved.</p>
        <div className="flex items-center gap-6 transition-all text-black/70">
          <Link className="hover:text-black" to="#">Privacy policy</Link>
          <Link className="hover:text-black" to="#">Terms of Use</Link>
        </div>
      </div>
    </footer>
  )
}

export default LandingPageFooter
