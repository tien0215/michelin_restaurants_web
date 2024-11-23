import React from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const location = useLocation();

  // Specify pages where the search bar should not appear
  const noSearchBarPages = ["/login", "/register"];
  const shouldShowSearchBar = !noSearchBarPages.includes(location.pathname);

  const handleLogout = () => {
    AuthService.logout(); // 清空local storage
    window.alert("登出成功!現在您會被導向到首頁。");
    setCurrentUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          {/* Search Section */}
          {shouldShowSearchBar && (
            <div className="d-flex align-items-center w-50 ms-3 mt-4">
              <input
                type="text"
                className="form-control py-3 me-3 w-100 rounded-0"
                placeholder="Type restaurant name here..."
                aria-label="Type restaurant name here"
                style={{ backgroundColor: "#D9D9D9", height: "50px" }}
              />
              <button
                className="btn btn-danger rounded"
                type="button"
                style={{
                  height: "50px",
                  fontFamily: "Inter",
                  fontSize: "18px",
                }}
              >
                Search
              </button>
            </div>
          )}

          {/* Navbar Toggle (for smaller screens) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div
            className="collapse navbar-collapse justify-content-end mt-4 fs-5"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item me-3 ms-3 ">
                <a
                  className="nav-link"
                  href="/register"
                  style={{ fontFamily: "Inter" }}
                >
                  Register
                </a>
              </li>
              <li className="nav-item me-3 ms-3 ">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item me-3 ms-3">
                <a className="nav-link" href="/homepage">
                  Homepage
                </a>
              </li>
            </ul>
          </div>
        </div>
        <style>
          {`
      .form-control::placeholder {
        color: white;
        font-size: 18px;
        font-family:"Inter";
      }
    `}
        </style>
      </nav>
    </div>
  );
};

export default NavComponent;
