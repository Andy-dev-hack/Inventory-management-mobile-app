import { useNavigate } from "react-router-dom";

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export const FloatingActionButton = ({
  onClick,
}: FloatingActionButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/add");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="md:hidden fixed bottom-20 right-4 p-4 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 z-50 animate-in zoom-in duration-300"
      aria-label="Add Asset"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
};
