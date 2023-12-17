import React,{useState, useEffect, useCallback} from 'react'
import axios from 'axios'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartDataItems = [string, number];
const CoinChart = ({params}: any) => {
  console.log(params)
    const [chartData, setChartData]=useState<ChartDataItems[]>([])
    const [days, setDays]=useState(1)
    const CoinChartData = useCallback(async()=>{
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${params}/market_chart?vs_currency=usd&days=${days}`)
            setChartData(data.prices)
        } catch (error) {
            console.log(error)  
        }
    },[days, params])

    useEffect(()=>{
        CoinChartData() 
    },[params, days, CoinChartData])

  const myData: ChartData<'line'> = {
    labels: chartData.map((value)=>{
     const date = new Date(value[0])
     const time = 
     date.getHours()> 12 
     ? `${date.getHours() -12} : ${date.getMinutes()} PM` 
     : `${date.getHours()} : ${date.getMinutes()} AM`
      return days===1 ? time : date.toLocaleDateString() 
    }),
    datasets:[
        {
            label: ` Price in Past Days ${days} in usd `,
            data: chartData.map((value)=>value[1]),
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 3 
        }
    ] 
  }




  return (
     <>
     {
      chartData.length === 0 ? ( <h1>Loading</h1>) : (

        <div className='w-[50vw] pt-20 bg-black pr-20 text-black'>
        {/* <Line data={myData} />  */}
        <Line data={myData} options={{
          elements:{
              point:{
                  radius:0.5,
                  backgroundColor: 'white'
              },
          }
        }} style={{marginTop:"5rem", width:"60rem", color: 'black'}} />
  
  <div className='flex gap-2' style={{marginTop:"30px"}}>
               <button
               className='border border-black p-2 bg-orange-400 rounded-xl'
               onClick={()=>setDays(1)} >24 hours</button>
               <button
               className='border border-black p-2 bg-orange-400 rounded-xl'
               onClick={()=>setDays(30)}>1 Month</button>
               <button
               className='border border-black p-2 bg-orange-400 rounded-xl'
               onClick={()=>setDays(365)}>1 Year</button>
             </div>
      </div>
      )
     }
     </>
  )
}

export default CoinChart