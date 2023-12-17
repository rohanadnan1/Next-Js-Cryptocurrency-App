'use client'

import axios from "axios"
import { useQuery } from "react-query"
import { ThreeCircles } from "react-loader-spinner"
import CoinChart from "@/app/components/CoinChart"
import Image from 'next/image'

const Coin = ({params}: any) => {

    const getCoin = async () => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.coin}`)
       console.log(res.data)
        return res.data
    }

    const {data, isLoading} = useQuery({queryKey: ['coin', params.coin], queryFn: getCoin})
    console.log(data)

    if(isLoading){
        return(
            <div className="h-[80vh] flex items-center justify-center">
                <ThreeCircles
                height="50"
                width="50"
                color="white"
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
        <div className="flex">
        <div className="bg-black h-[90vh] p-24 text-white">
            <div  className="flex border-4 rounded-3xl m-8  ml-20 w-[20rem] p-10 justify-center items-center flex-col gap-7 border-slate-500 pt-2 pb-2">
            <img src={data?.image.large} alt="logo" className="h-12"/>
            <h2 className=" w-[14rem] text-center font-bold">Name: {data?.name}</h2>
            <h4 className=" font-bold">Price in USD: <span className="text-white">{data?.market_data.current_price.usd.toFixed(0)}$</span></h4>
            <h4 className=" font-bold text-center">{data?.description.en.split('.')[0]}</h4>
            </div>
        </div>
             <CoinChart params={params.coin}/>
        </div>
    )
}

export default Coin