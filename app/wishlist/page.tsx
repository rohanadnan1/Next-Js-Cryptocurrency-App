"use client";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeWishList } from "../store/wishlist";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const WishList = () => {
  const data = useSelector((state: any) => state.wishList);
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    if(data.length == 0){
      router.push('/coins')
    }
  },[data, router])


  return (
    <>
      {data &&
        data.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="flex items-center justify-evenly mt-6 border-b-2 pb-4 text-white"
            >
              <img src={item.image} alt="logo" className="h-14" />
              <h2 className=" w-[14rem] text-center font-bold">{item.name}</h2>
              <h4 className=" font-bold">{item.current_price.toFixed(0)}$</h4>
              <button
                onClick={() => dispatch(removeWishList(item.id))}
                className="h-12 border-2 p-2 bg-red-500 rounded-2xl "
              >
                Remove from WishList
              </button>
            </div>
          );
        })}

      <div className="h-[80vh] flex items-center justify-center">
        {data.length == 0 && <h1 className="text-2xl">No Data Found</h1>}
      </div>
    </>
  );
};

export default WishList;
