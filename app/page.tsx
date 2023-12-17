"use client";

import getExchanges from "./getExhanges";
import { useQuery } from "react-query";
import { ThreeCircles } from "react-loader-spinner";
import Image from "next/image";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: "exchanges",
    queryFn: getExchanges,
  });
  console.log(data);

  if (isLoading)
    return (
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
    );

  return <>
  <div className="h-full bg-slate-500 p-2 pl-2">
    <div className="flex pl-[300px] items-center justify-between pt-4">
      <h1 className="ml-10 font-bold text-xl">Exchanges</h1>
      <h1 className="pl-[250px] font-bold text-xl">24h Trading Volume</h1>
      <h1 className="pr-[200px] font-bold text-xl">Rank</h1>
    </div>
   {data?.map((item:any)=>{
    return(
      <div key={item.id} className="flex justify-evenly items-center mt-8 border-b-2 pb-3 border-b-neutral-950">
      <img src={item.image} alt="logo" className="h-12"/>
      <h2 className=" w-[14rem] text-center font-bold">{item.name}</h2>
      <h4 className=" font-bold">{item.trade_volume_24h_btc.toFixed(0)}$</h4>
     {
      item.trust_score_rank == 1 ?  
     <h4 className=" font-bold">1st</h4>
      : ''
     }
      {
        item.trust_score_rank == 2 ?
        <h4 className=" font-bold">2nd</h4>
        : ''
      }
      {
        item.trust_score_rank == 3 ?
        <h4 className=" font-bold">3rd</h4>
        : ''
      }
      {
        item.trust_score_rank > 3 ?
        <h4 className=" font-bold">{item.trust_score_rank}th</h4>
        : ''
      }
    </div>
    )
   })}
  </div>
  </>;
}
