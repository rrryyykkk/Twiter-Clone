import { useState } from "react";
import XSvg from "../../components/svgs/X";

// icons
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthProvider";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ userName, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setAuthUser(data);
      toast.success("Login Successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
          <label className="input input-bordered rounded-xl flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="userName"
              onChange={handleInputChange}
              value={formData.userName}
            />
          </label>
          <label className="input input-bordered rounded-lg flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn btn-primary rounded-full text-white">
            {isPending ? "Loading...." : "login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Dont't"} have an account?</p>
          <Link to={"/signup"}>
            <button className="btn btn-primary rounded-full btn-outline w-full">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
