import { Link } from "react-router-dom";
import profileImg from "../../../public/avatars/boy1.png";
import XSvg from "../svgs/X";

const Sidebar = () => {
  const data = {
    fullName: "Kiki Koko",
    userName: "kiki",
    profile: profileImg,
  };
  return (
    <div className="md:flex-[2_2_0] w-18 max-w-53">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to={"/"} className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-800" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to={"/"}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full"
            ></Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
