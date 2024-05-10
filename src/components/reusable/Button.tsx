interface ButtonProps {
  type: "primary" | "secondary";
  text: string;
  clickHandler?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ type, text, clickHandler }: ButtonProps) => {
  return (
    <button
      className={`px-6 py-2  rounded-md text-slate-200 font-semibold text-2xl w-full capitalize ${
        type === "primary" && "bg-blue-600"
      } ${type === "secondary" && "bg-lime-600"}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};
export default Button;
