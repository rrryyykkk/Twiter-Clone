import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Link } from "react-router-dom";

// icons
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Notification = () => {
  const isLoading = false;
  const notification = [
    {
      _id: "1",
      from: {
        _id: "1",
        userName: "johdoe",
        profileImg: "/avatars/boy3.png",
      },
      type: "follow",
    },
    {
      _id: "2",
      from: {
        _id: "2",
        userName: "janedoe",
        profileImg: "/avatars/girl3.png",
      },
      type: "like",
    },
  ];
  const deleteNotification = () => {
    alert("All notifications deleted");
  };
  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold">Notifications</p>
        <div className="dropdown">
          <div className="m-1" tabIndex={0} role="button">
            <IoSettingsOutline className="w-4" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="toast toast-center toast-top">
              <a
                onClick={deleteNotification}
                className="bg-primary hover:bg-black"
              >
                Delete All notification
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center h-full items-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {notification?.length === 0 && (
        <div className="text-center p-4 font-bold">No notification 🤔</div>
      )}
      {notification?.map((notification) => (
        <div className="border-b border-gray-700" key={notification._id}>
          <div className="flex gap-2 p-4">
            {notification.type === "follow" && (
              <FaUser className="w-7 h-7 text-primary" />
            )}
            {notification.type === "like" && (
              <FaHeart className="w-7 h-7 text-red-500" />
            )}
            <Link to={`/profile/${notification.from.profileImg}`}>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={
                      notification.from.profileImg || "/avatar-placeholder.png"
                    }
                  />
                </div>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">@{notification.from.userName}</span>
                {notification.type === "follow"
                  ? "followed you"
                  : "liked your post"}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
