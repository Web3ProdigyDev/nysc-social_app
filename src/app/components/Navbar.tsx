import Link from 'next/link'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  return (
    <div>
        {/* LEFT */}
      <div className="">
        <Link href={"/"}>CORPERSJOINT</Link>
      </div>
        {/* CENTER */}
      <div className="hidden"></div>
        {/* RIGHT */}
      <div className="">
        <MobileMenu />
      </div>
    </div>
  )
}

export default Navbar
