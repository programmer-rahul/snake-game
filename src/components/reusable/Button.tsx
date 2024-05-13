interface ButtonProps {
  type: "primary" | "secondary";
  text: string;
  clickHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  style?: string;
}

const Button = ({ type, text, clickHandler, style }: ButtonProps) => {
  return (
    <button
      className={`xl:px-6 xl:py-2 px-3 py-1 rounded-md text-slate-200 font-semibold xl:text-2xl text-xl w-full capitalize ${style} ${
        type === "primary" && "bg-blue-600"
      } ${type === "secondary" && "bg-lime-600"}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};
export default Button;
