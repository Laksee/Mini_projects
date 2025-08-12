import { useState,useEffect } from "react"
import axios from "axios"

export const Balance = () => {
    const [amount,setAmount] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            const balance = Math.floor(response.data.balance)
            setAmount(balance)
        }
    fetchUser()

    },[])
    

    return <div className="flex">
        <div className="font-bold text-lg">
            Your Balance:
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs-{amount}
        </div>
    </div>
}