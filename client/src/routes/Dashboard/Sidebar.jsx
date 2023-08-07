/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Form, redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faCalendarDays,
  faChartPie,
  faRobot,
  faPowerOff,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

// Sidebar Data
const sidebarData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    childPath: "",
    icon: (
      <FontAwesomeIcon icon={faChalkboardUser} className="w-[20px] h-[20px]" />
    ),
  },
  {
    title: "Workout Plan",
    link: "/dashboard/workouts",
    childPath: "/workouts",
    icon: (
      <FontAwesomeIcon icon={faCalendarDays} className="w-[20px] h-[20px]" />
    ),
  },
  {
    title: "Nutrition",
    link: "/dashboard/nutrition",
    childPath: "/nutrition",
    icon: <FontAwesomeIcon icon={faChartPie} className="w-[20px] h-[20px]" />,
  },
  {
    title: "AI Workout",
    link: "/dashboard/ai",
    childPath: "/ai",
    icon: <FontAwesomeIcon icon={faRobot} className="w-[20px] h-[20px]" />,
  },
];

export default function Sidebar({ toggleSidebar, isExpanded, currentPath }) {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    redirect("/auth");
  };

  const isLinkActive = (linkPath) => {
    return currentPath === linkPath;
  };

  return (
    <nav
      className={`${
        isExpanded ? "left-0" : "-left-[250px]"
      } fixed z-[999] w-[250px] h-screen bg-sidebar transition-all duration-500`}
    >
      {/* Header */}
      <div className="flex flex-col justify-center items-center p-4">
        <Link
          to="/"
          className="text-[24px] uppercase font-bold text-white mb-0"
        >
          Flex <span className="text-accent">Fusion</span>
        </Link>
        <div className="w-full mt-2 border-b border-white"></div>
      </div>

      {/* Nav links for sidebar */}
      <div className="flex flex-col">
        {/* Nav link */}
        {sidebarData.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.link}
              className={`${
                isLinkActive(`/dashboard${item.childPath}`)
                  ? "bg-accent hover:bg-accent/90"
                  : "bg-none hover:bg-secondary hover:border-l-[5px] hover:border-l-accent"
              } w-full min-h-[60px] p-4 flex items-center text-white cursor-pointer`}
            >
              <div className="w-full h-full ml-4">
                {item.icon}
                <span className="inline-block ml-4">{item.title}</span>
              </div>
            </Link>
          );
        })}

        {/* Logout */}
        <li className="w-full min-h-[60px] p-4 flex items-center text-white cursor-pointer hover:bg-secondary hover:border-l-[5px] hover:border-l-accent">
          {currentUser && (
            <Form
              method="post"
              onSubmit={handleLogout}
              className="w-full h-full ml-4"
            >
              <button type="submit">
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className="w-[20px] h-[20px]"
                />
                <span className="inline-block ml-4">Logout</span>
              </button>
            </Form>
          )}
        </li>
      </div>

      {/* Toggle sidebar */}
      <div
        className="absolute bottom-0 w-full h-[50px] flex items-center justify-center cursor-pointer bg-accent text-white hover:bg-accent/90"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />
      </div>
    </nav>
  );
}
