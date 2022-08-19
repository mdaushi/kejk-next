import classNames from "classnames";

const TextButton = ({ textColor, darkTextColor, children }) => {
  return (
    <button
      className={classNames(
        `text-${textColor} dark:text-${darkTextColor} flex items-center justify-center space-x-2 text-sm font-medium transition ease-in-out hover:text-teal-500 w-max md:text-base unstyled`
      )}
    >
      {children}
    </button>
  );
};

export default TextButton;
