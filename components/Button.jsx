import classNames from "classnames";

const Button = ({
  bgColor,
  textColor,
  borderColor,
  darkBgColor,
  darkTextColor,
  darkBorderColor,
  children,
}) => {
  return (
    <button
      className={classNames(
        `bg-${bgColor} text-${textColor} dark:bg-${darkBgColor} dark:text-${darkTextColor} rounded-md border border-${borderColor} dark:border-${darkBorderColor} flex w-full items-center justify-center space-x-2 text-sm font-medium transition ease-in-out hover:border-teal-500 md:w-max md:text-base`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
