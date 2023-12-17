import axios from "axios"

const getExchanges = async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/exchanges')
    console.log(res.data)
    return res.data
}

export default getExchanges