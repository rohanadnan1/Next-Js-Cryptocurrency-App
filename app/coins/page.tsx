'use client'

import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'
import {ThreeCircles} from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { addWishList } from '../store/wishlist'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image'

const Coins = () => {

    const [currency, setCurrency] = useState('usd')
    const [data, setData] = useState<any>(null)
    const dispatch = useDispatch()
    const searchCoin = useSelector((state:any)=>state.searchCoin.searchCoin)
    
    const getCoins = async () => {
        const res = await axios.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`)
        return res.data
    }

    const {data: queryData, isLoading} = useQuery({queryKey: ['coins', currency], queryFn: getCoins})
    
    useEffect(()=>{
        setData(queryData)
    }, [queryData])

    if(isLoading){
        return(
            <div className="h-[80vh] flex items-center justify-center">
            <ThreeCircles
              height="50"
              width="50"
              color="white~"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
        </div>  
        )
    }

    return(
        <div className='bg-slate-700 h-fit'>
           <div className='flex justify-center items-center gap-7 border-red-500 pt-2 pb-2'>
            <button
            onClick={()=>setCurrency('usd')}
            className='border border-black p-2 bg-orange-400 rounded-xl'>USD</button>
            <button
            onClick={()=>setCurrency('pkr')}
            className='border border-black p-2 bg-orange-400 rounded-xl'>PKR</button>
           </div>
           {
                data?.filter((data: any)=>{
                    if(searchCoin == ''){
                        return data
                    }else if(data.name.toLowerCase().includes(searchCoin.toLowerCase())){
                        return data
                    }
                }).map((item:any)=>(
                    <div key={item.id} className='flex items-center justify-evenly mt-6 border-b-2 pb-4'>
                    <Link href={`/coins/${item.id}`} className='flex items-center justify-evenly gap-12'>
                        <img src={item.image} alt="logo" className="h-14"/>
                        <h2 className=" w-[14rem] text-center font-bold">{item.name}</h2>
                        <h4 className=" font-bold">{item.current_price.toFixed(0)}{currency == 'pkr' ? ' Rupees' : '$'}</h4>      
                    </Link>
                    <button
                        onClick={()=>dispatch(addWishList(item))}
                        className='h-12 border-2 p-2 bg-red-500 rounded-2xl '>Add to WishList</button>
                    </div>
                
                ))
            }
        </div>
    )
}



export default Coins