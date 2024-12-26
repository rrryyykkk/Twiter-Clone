import { useState } from "react";
import XSvg from "../../components/svgs/X";

// icons
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError = false;

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10 ">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join Today.</h1>
          <label className="input input-bordered rounded-xl flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInput}
              value={formData.email}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded-xl flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="userName"
                onChange={handleInput}
                value={formData.userName}
              />
            </label>
            <label className="input input-bordered rounded-xl flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Fullname"
                name="fullName"
                onChange={handleInput}
                value={formData.fullName}
              />
            </label>
            <label className="input input-bordered rounded-lg flex items-center gap-2 flex-1">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                onChange={handleInput}
                value={formData.password}
              />
            </label>
          </div>
          <button className="btn btn-primary rounded-full text-white">
            Sign Up
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have a account</p>
          <Link to={"/login"}>
            <button className="btn btn-primary rounded-full text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
