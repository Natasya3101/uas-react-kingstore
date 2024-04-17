import { useContext } from "react";
import Button from "./Button";
import { AllContext } from "@/App";
import logo from "@/assets/logo.png";

/* eslint-disable react/prop-types */
const Header = () => {
  const { openPopup, admin, setAdmin, navigate } = useContext(AllContext);
  const logout = async () => {
    await fetch(`http://localhost:3000/api/v1/auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.msg);
        setAdmin({});
        localStorage.removeItem('token')
        navigate("/");
      });
  };
  return (
    <header className="bg-slate-300 flex justify-between z-50 text-black p-5 sticky top-0">
      <img
        src={logo}
        alt="logo"
        width={40}
        className="cursor-pointer"
        onClick={() => navigate("/home")}
      />
      <Button onClick={admin.token? logout : openPopup}>
        {admin.token ? "Logout" : "Login"}
      </Button>
    </header>
  );
};

export default Header;
