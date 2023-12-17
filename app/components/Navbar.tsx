'use client'

import Link from "next/link"
import { SiMoneygram } from "react-icons/si";
import { useSelector } from "react-redux";
import { SearchBar } from "./SearchBar";
import { usePathname } from "next/navigation";

const Navbar = () => {

    const data = useSelector((state:any)=>state.wishList)
    const showWishList = data.length > 0 ? true : false
    const pathname = usePathname()

    return(
        <nav className="flex justify-between items-center p-4 bg-slate-900 text-white">
            <div className="pl-4 flex items-center gap-2">
                <h1 className="font-bold text-lg">Satoshi Nakamoto</h1>
                <SiMoneygram size={20}/>
            </div>
            {pathname === '/coins' && <SearchBar/>}
            <div className="flex justify-center gap-8 items-center pr-4">
                <Link href={'/'}>
                    <h2>Home</h2>
                </Link>
                <Link href={'/coins'}>
                    <h2>Coins</h2>
                </Link>
                {showWishList && <Link href={'/wishlist'}>
                    <h1>WishList</h1>
                </Link>}
            </div>
        </nav>
    )
}

export default Navbar
