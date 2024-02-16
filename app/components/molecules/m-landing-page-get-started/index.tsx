import { Link } from "@remix-run/react"
import { GoArrowUpRight } from "react-icons/go";

const LandingPageGetStarted = () => {
  return (
    <div className="relative flex flex-col items-center justify-center mt-48 md:mt-64">
      <div className="absolute -z-50">
        <div className="h-screen relative z-0 max-h-[250px] md:max-h-[506px] overflow-hidden w-screen flex flex-col items-center justify-center">
          <div className="absolute bg-gradient-to-b z-50 from-white to-transparent top-0 w-screen h-[50%]" />
          <img className="w-screen absolute -z-10 self-center object-cover" src="/assets/images/trade.jpeg" />
          <div className="absolute bg-gradient-to-b from-transparent to-white bottom-0 w-screen h-[50%]" />
        </div>
      </div>
      <div className="font-inter gap-3 md:gap-6 flex flex-col items-center">
        <h3 className="font-extrabold text-5xl lg:text-8xl text-white">Let's Start</h3>
        <p className="md:text-2xl font-medium text-white/80">Borrow, lend and convert</p>
        <Link className="bg-primary flex items-center gap-1 p-4 px-10 text-white font-medium rounded-[30px]" to="#">
          <span>Get started</span>
          <GoArrowUpRight size={24} />
        </Link>
      </div>
    </div>
  )
}

export default LandingPageGetStarted
