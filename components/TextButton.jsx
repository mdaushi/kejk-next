import classNames from "classnames";

const TextButton = ({
  textColor,
  darkTextColor,
  children,
}) => {
  return (
    <button
      className={classNames(
        `text-${textColor} dark:text-${darkTextColor} rounded-md flex items-center justify-center space-x-2 py-2 px-4 text-sm font-medium transition ease-in-out hover:border-teal-500 w-max md:text-base`
      )}
    >
      {children}
    </button>
  );
};

export default TextButton;
