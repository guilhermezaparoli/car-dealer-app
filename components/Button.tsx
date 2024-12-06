
type ButtonProps  = {
  text: string;
  disabled: boolean;
  className: string
}
const Button = ({ text, disabled, className = "" }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`w-full px-4 py-2 rounded ${
        disabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
