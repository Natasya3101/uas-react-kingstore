/* eslint-disable react/prop-types */
import { CircleX } from "lucide-react";

const Form = ({ closePopup, children, title}) => {
  return (
    <div className="w-full m-auto rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-600 transition-shadow border-gray-700">
      <CircleX
        color="red"
        size={26}
        onClick={closePopup}
        className="m-2 cursor-pointer right-0"
      />
      <div className=" sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Form;
