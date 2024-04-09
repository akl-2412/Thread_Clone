import { Alert} from "flowbite-react";
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
//import {  useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
//import { setLoading } from "../redux/user/userSlice";
import { toast } from "react-hot-toast";

export default function UpdatePassword() {
    //const {loading} = useSelector((state)=>(state.user));

    //const dispatch = useDispatch();
    const [loading,setLoading]=useState(false);
    const [formData,setFormData] = useState({});
    const [error,setError]=useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const token = location.pathname.split("/").at(-1);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleOnChange =(e)=>{
        setFormData( {...formData,[e.target.name]:e.target.value,token:token})
    }
    const handleOnSubmit = async(e)=>{
        
        e.preventDefault()
        if(!formData.password || !formData.confirmPassword || !token){
            return ;
        }
        try {
            setError(null);
            setLoading(true);
            const res = await fetch('/api/users/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            //console.log(formData);
            const data = await res.json();
           // console.log(data);
            if (data.success === false) {
              setLoading(false);
              setError(data.message);
              toast.error(error);
              return;
              //throw new Error(data.message)
            }
            //console.log(res.ok);
            //console.log(data.message);
            //console.log(res);
            if (res.ok) {
                toast.success("Password Update Succesfull");
                setLoading(false);
                navigate("/auth")
            }
        } 
        catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            setError(error);
            toast.error("Failed to send email for resetting password");
        }
        setLoading(false);
        
        
    }

  return(
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
    {loading ? (
      <div className="spinner"></div>
    ) : (
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Choose new password
        </h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
          Almost done. Enter your new password and youre all set.
        </p>
        <form onSubmit={handleOnSubmit}>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full !pr-10 rounded-md text-black"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative mt-3 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10 rounded-md text-black"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-fuchsia-800 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            Reset Password
          </button>
        </form>
        {
          error && (<Alert className="mt-6">
            {error}
          </Alert>)
        }
        <div className="mt-6 flex items-center justify-between">
          <Link to="/auth">
            <p className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    )}
  </div>
  )
}          

