import React, { useState, useRef, useEffect } from "react";
import "./support.css";
import Avatar from "./Avatar";
import SupportWindow from "./SupportWindow";
const Support = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <SupportWindow visible={visible} />
      <Avatar
        onClick={() => setVisible(true)}
        style={{ position: "fixed", bottom: "24px", right: "24px" }}
      />
    </div>
  );
};

export default Support;
