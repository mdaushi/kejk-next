function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
        `bg-${bgColor} text-${textColor} dark:bg-${darkBgColor} dark:text-${darkTextColor} rounded-md border border-${borderColor} dark:border-${darkBorderColor} flex items-center justify-start space-x-2 py-2 px-4 text-sm font-medium transition ease-in-out hover:border-teal-500 md:text-base`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
