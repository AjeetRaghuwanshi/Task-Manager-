import React, { useEffect, useRef, useState } from "react";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { SidebarItem } from "./Sidebar";
import {
  LayoutDashboard,
  Gauge,
  ClipboardCheck,
  NotebookPen,
  Import,
  BookCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileHeader = () => {
  const mobileMenuRef = useRef();

  const [showMobileMainDropdown, setShowMobileMainDropdown] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (!mobileMenuRef.current.contains(e.target)) {
        console.log(mobileMenuRef);
        setShowMobileMainDropdown(false);
      }
    };

    if (showMobileMainDropdown) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showMobileMainDropdown]);

  const navigate = useNavigate();
  return (
    <div className="sm:hidden flex justify-between w-full z-50">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <BookCheck size={30} />
        <span className="ml-4 font-semibold text-gray-700 text-xl">
          Prod Tasks
        </span>
      </div>
      <div className="flex relative">
        <div className="lg:hidden flex items-center" ref={mobileMenuRef}>
          <div className="flex justify-center items-center p-2 border-2 rounded-lg border-gray-700">
            <button
              onClick={() => {
                setShowMobileMainDropdown(!showMobileMainDropdown);
              }}
            >
              {showMobileMainDropdown ? (
                <IoMdClose className="text-3xl text-primary" />
              ) : (
                <HiOutlineMenuAlt2 className="text-3xl text-primary" />
              )}
            </button>
          </div>
          {showMobileMainDropdown && (
            <div className="absolute dropdown top-full right-[5%] p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-xl w-52 z-50 h-auto">
              <ul className="flex flex-col gap-1 justify-center">
                <SidebarItem
                  icon={<LayoutDashboard size={20} />}
                  text={"Tasks"}
                  path={"/"}
                />
                <SidebarItem
                  icon={<Gauge size={20} />}
                  text={"Important"}
                  path={"/important"}
                />
                <SidebarItem
                  icon={<ClipboardCheck size={20} />}
                  text={"Completed"}
                  path={"/completed"}
                />
                <SidebarItem
                  icon={<NotebookPen size={20} />}
                  text={"ToDo"}
                  path={"/todo"}
                />
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
