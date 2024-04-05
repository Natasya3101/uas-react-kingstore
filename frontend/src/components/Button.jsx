/* eslint-disable react/prop-types */
export default function Button({ children, className, onClick }) {
  return (
    <div
      className={`cursor-pointer flex items-center gap-2 bg-slate-500 hover:bg-slate-400 text-white p-2 rounded [&>svg]:w-4 [&>svg]:h-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
