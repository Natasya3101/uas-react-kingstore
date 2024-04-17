/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import Popup from "@/components/Pop-up";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AllContext } from "@/App";

export default function Welcome() {
  const { popUp, setPopUp, closePopup, navigate, setAdmin } =
    useContext(AllContext);
  const [req, setReq] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setReq({
      ...req,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmin(res);
        localStorage.setItem("token", res.token);
        alert(`Login Berhasil`);
        setPopUp(false);
        navigate("/home");
      });
    };
  useEffect(() => {
    submit;
  });

  return (
    <>
      <title>Welcome</title>
      <main className="w-11/12 mt-2 m-auto flex flex-col gap-2 sm:flex-row justify-between p-5 items-center">
        <div className="backdrop-blur-2xl border-slate-400 p-5 sm:w-2/5 h-min border rounded-xl ">
          <h1 className="text-center font-bold">WELCOME</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            pariatur dolorum consectetur illum dolor earum ex, iure quidem
            voluptatibus assumenda cupiditate facere quaerat iste labore laborum
            possimus est amet culpa aperiam maiores laudantium. Reiciendis
            minima blanditiis corrupti? Quaerat quae id distinctio consequatur
            nam unde accusamus minima dolore exercitationem saepe officia sint
            dolor corrupti deleniti, iure quibusdam beatae. Est, ab quam nobis
            neque, minus sit fugit deserunt dignissimos alias consequuntur
            eligendi perferendis ex ratione quaerat blanditiis. Eveniet
            necessitatibus sint deserunt accusamus sunt quos quasi? Eligendi
            numquam cupiditate itaque blanditiis earum facere, doloribus optio
            aperiam harum delectus in nam quia, commodi soluta?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:w-2/4 place-items-center p-100">
          <img
            src="https://i.pinimg.com/564x/d8/7f/a6/d87fa6e631702a85c11d4b13a822f7e1.jpg"
            alt=""
            width={200}
          />
          <img
            src="https://i.pinimg.com/564x/d3/14/47/d31447dd2207c04ca65f630d4b3b39e8.jpg"
            alt=""
            width={200}
          />
          <img
            src="https://i.pinimg.com/564x/5d/be/10/5dbe10cbcb8bbad2fac88a12c9a94779.jpg"
            alt=""
            width={200}
          />
          <img
            src="https://i.pinimg.com/564x/2d/f6/4a/2df64a1a1d8f70affc11066b5003cbda.jpg"
            alt=""
            width={200}
          />
        </div>
      </main>
      {popUp && (
        <Popup closePopup={closePopup} title={"Sign in to your account"}>
          <form className="space-y-4 md:space-y-6" onSubmit={submit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                name="username"
                type="text"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="Username"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                required
                onChange={handleChange}
              />
            </div>
            <button
              className={`w-full cursor-pointer flex items-center gap-2 bg-slate-500 hover:bg-slate-400 text-white p-2 [&>svg]:w-4 [&>svg]:h-4 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 justify-center`}
            >
              Sign in
            </button>
          </form>
        </Popup>
      )}
    </>
  );
}
