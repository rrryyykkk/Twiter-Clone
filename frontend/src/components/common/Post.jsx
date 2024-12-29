/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiRepost } from "react-icons/bi";
import {
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const postOwner = post.user;
  const isLiked = false;

  const isMyPost = true;

  const formattedDate = "1h";

  const isCommenting = false;

  const handleDeletePost = () => {};

  const handlePostComment = (e) => {
    e.preventDefault();
  };

  const handleLikedPost = () => {};
  return (
    <div className="flex gap-2 items-start p-4 border-b border-gray-700">
      <div className="avatar">
        <Link
          to={`/profile/${postOwner.userName}`}
          className="w-8 rounded-full overflow-hidden"
        >
          <img src={postOwner.profileImg} className="font-bold" />
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <Link to={`/profile/${postOwner.userName}`} className="font-bold">
            {postOwner.fullName}
          </Link>
          <span className="text-gray-700 flex gap-1 tetx-sm">
            <Link to={`/profile/${postOwner.userName}`}>
              @{postOwner.userName}
            </Link>
            <span>.</span>
            <span>{formattedDate}</span>
          </span>
          {isMyPost && (
            <span className="flex justify-end flex-1">
              <FaTrash
                className="cursor-pointer hover:text-red-500"
                onClick={handleDeletePost}
              />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 overflow-hidden">
          <span>{post.text}</span>
          {post.img && (
            <img
              src={post.img}
              className="h-80 object-contain rounded-lg border border-gray-700"
              alt=""
            />
          )}
        </div>
        <div className="flex justify-between mt-3">
          <div
            className="flex gap-4 items-center cursor-pointer group"
            onClick={() =>
              document.getElementById("comments_modal" + post._id).showModal()
            }
          >
            <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
            <span className="text-sm text-slate-500 group-hover:text-sky-400">
              {post.comment.length}
            </span>
          </div>
          {/* we're using Modal component from Daisyui */}
          <dialog
            id={`comments_modal${post._id}`}
            className="modal border-none outline-none"
          >
            <div className="modal-box rounded border border-gray-600">
              <div className="font-bold text-lg max-h-60 overflow-auto">
                {post.comment.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No comment yet 🤔 Be the First one 😉
                  </p>
                )}
                {post.comment.map((comment) => (
                  <div key={comment._id} className="flex gap-2 items-start">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={
                            comment.user.profileImg || "/avatar-placeholder.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">
                          {comment.user.fullName}
                        </span>
                        <span className="text-gray-700 text-sm">
                          @{comment.user.userName}
                        </span>
                      </div>
                      <div className="text-sm">{comment.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form
                className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                onClick={handlePostComment}
              >
                <textarea
                  className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800"
                  placeholder="Add a comment...."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                  {isCommenting ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Post"
                  )}
                </button>
              </form>
            </div>
            <form className="modal-backdrop" method="dialog">
              <button className="outline-none">close</button>
            </form>
          </dialog>
          <div className="flex gap-1 items-center group cursor-pointer">
            <BiRepost className="w-6 h-6 text-slate-600 group-hover:text-green-500" />
            <span className="text-sm text-slate-500 group-hover:text-green-500">
              0
            </span>
          </div>
          <div
            className="flex gap-1 items-center group cursor-pointer"
            onClick={handleLikedPost}
          >
            {!isLiked && (
              <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
            )}
            {isLiked && (
              <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-50" />
            )}
            <span
              className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                isLiked ? "text-pink-500" : ""
              }`}
            >
              {post.likes.length}
            </span>
          </div>
        </div>
        <div className="flex w-1/3 justify-end gap-2 items-center">
          <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" /> 
        </div>
      </div>
    </div>
  );
};

export default Post;
