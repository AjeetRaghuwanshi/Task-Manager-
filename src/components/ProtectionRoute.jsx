import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectionRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user]);

  return <div>{children}</div>;
};

export default ProtectionRoute;
