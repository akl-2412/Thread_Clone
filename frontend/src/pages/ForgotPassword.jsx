import { Alert } from "flowbite-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
//import { Spinner } from "flowbite-react";
import { BounceLoader } from "react-spinners";
function ForgotPassword() {
    const [formData, setFormData] = useState({});
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessagepass, setErrorMessagePass] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            return;
        }

        try {
            setLoading(true);
            setErrorMessagePass(null);
            const res = await fetch("/api/users/reset-password-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
           
            if (data.success === false) {
               // console.log(data);
                toast.error(data.message);
                setLoading(false);
                setErrorMessagePass(data.message);
               
            }
            if (res.ok) {
                toast.success("Reset Email Sent");
                setEmailSent(true);
            }
        } catch (error) {
            setErrorMessagePass(error);
            toast.error("Failed to send email for resetting password");
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            {loading ? (
                <div className="flex justify-center items-center h-screen ">
                    <BounceLoader color="darkblue" />
                </div>
            ) : (
                <div className="w-full sm:w-1/2 mt-10 mb-20">
                    <h1 className="text-center text-3xl font-semibold">{!emailSent ? "Reset your Password" : "Check Mail"}</h1>
                    <p className="text-center mt-2">
                        {!emailSent ? "We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery" : `We have sent the reset email to ${formData.email}`}
                    </p>
                    <form onSubmit={handleOnSubmit} className="mt-5">
                        {!emailSent && (
                            <label className="block text-center justify-center items-center">
                                <p>Email address</p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value.trim() })}
                                    placeholder="Enter email address"
                                    className="form-style w-full rounded-md py-2 px-4 mt-2"
                                />
                            </label>
                        )}
                         <div className="flex justify-center">
                            <button className="mt-6 w-full sm:w-auto bg-purple-600 text-white rounded-md py-2 px-4">
                                {!emailSent ? "Submit" : "Resend Email"}
                            </button>
                         </div>
                       
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/auth" className="flex items-center justify-center text-blue-500">
                            <BiArrowBack className="mr-2" /> Back To Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;
