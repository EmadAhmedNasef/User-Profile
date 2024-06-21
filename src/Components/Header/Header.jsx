import React, { useContext } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { token, user, setToken } = useContext(userContext);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setToken(null);
  }
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2">
        {token ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Link to="profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link to="changepass">
              <Dropdown.Item>Change Pass</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link to="login">
              <Button className="bg-green-600">Sign In</Button>
            </Link>
            <Link to="register">
              <Button className="bg-cyan-500">Register</Button>
            </Link>
          </>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Home
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
