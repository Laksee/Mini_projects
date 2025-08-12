import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom"


export const Appbar = () => {
    const [firstname,setFirstname] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/user/getini", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            setFirstname(response.data.firstname)
        }

        fetchUser()
    },[])

    const initial = firstname ? firstname[0].toUpperCase() : "U"

    return <div className="shadow h-14 flex bg-blue-300 justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Laksepay App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full ">
                Hello ,
            </div>
            <div className="flex py-4 px-2 font-bold">{firstname.toUpperCase()}!</div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center font-bold h-full text-xl">
                    {initial}
                </div>
            </div>
            <button className="px-3 mr-2 mt-2 mb-2 bg-blue-400 rounded-full border font-semibold" onClick={() => {
                navigate("/signin")
            }}>Logout? </button>
        </div>
    </div>
}