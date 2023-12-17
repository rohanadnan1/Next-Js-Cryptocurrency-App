import { useDispatch } from "react-redux"
import { setSearchCoin } from "../store/searchCoin"

export const SearchBar = () => {
    const dispatch = useDispatch()
    return (
        <>
            <input type="text"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-black focus:outline-none"
            onChange={(e)=>dispatch(setSearchCoin(e.target.value))}
            />
        </>
    )
}