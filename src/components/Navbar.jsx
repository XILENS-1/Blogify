import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/store/userSlice";

const Navbar = () => {
  const userId = useSelector((state) => state.auth?.user?.id ?? "guest");
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(userId !== "guest");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(removeUser());
    setLoggedIn(false);
    closeMobileMenu();
    window.location.reload();
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setLoggedIn(userId !== "guest");
  }, [userId]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img src={logo} className="h-8" alt="blogify Logo" />
        </Link>
        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="hidden md:block">
          <ul className="flex space-x-8 font-medium">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/add-post" className="hover:text-red-500">
                    Add Post
                  </Link>
                </li>
                <li>
                  <Link to="/all-post" className="hover:text-red-500">
                    My Posts
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-red-500">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-red-500">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-red-500">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
          <div
            className="absolute top-0 right-0 w-96 max-w-full h-full bg-white shadow-lg p-40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mb-4 text-gray-900 dark:text-white"
              onClick={closeMobileMenu}
            >
              Close
            </button>
            <ul className="space-y-4 font-medium">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/" onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-post" onClick={closeMobileMenu}>
                      Add Post
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-post" onClick={closeMobileMenu}>
                      My Posts
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={closeMobileMenu}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={closeMobileMenu}>
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
