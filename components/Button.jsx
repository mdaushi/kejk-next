import classNames from "classnames";

const Button = ({
  bgColor,
  textColor,
  borderColor,
  children,
  href,
  onClick,
}) => {
  return (
    <a
      href={href}
      className={classNames(
        `${bgColor} ${textColor} rounded-md border ${borderColor} flex w-max cursor-pointer items-center justify-center space-x-2 px-4 py-2 text-sm font-medium transition ease-in-out hover:border-teal-500 md:text-base`
      )}
    >
      <button
        className="flex w-full items-center justify-center space-x-2"
        onClick={onClick}
      >
        {children}
      </button>
    </a>
  );
};

export default Button;
