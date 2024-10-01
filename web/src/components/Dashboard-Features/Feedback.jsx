import React from "react";
import FeedbackModal from "../FeedbackModal";
import { useAuthContext } from "../../context/AuthContext";
import FeedbackAdminModal from "../FeedbackAdminModal";

const Feedback = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="w-full flex items-center justify-center">
      {authUser.role === "volunteer" && <FeedbackModal />}
      {authUser.role === "admin" && <FeedbackAdminModal />}
    </div>
  );
};

export default Feedback;
