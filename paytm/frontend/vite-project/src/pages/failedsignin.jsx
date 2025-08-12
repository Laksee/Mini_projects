import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/Inputbox"
import { SubHeading } from "../components/Subheading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Failedsignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
  const navigate = useNavigate();


    return <div className="bg-red-400 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setEmail(e.target.value);
        }} placeholder="lakshay@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                email,
                password
              });
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
          }} label={"Sign in"} />
            <div className="text-red-600 font-semibold text-sm mt-2">
              Invalid credentials. Please try again.
            </div>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}