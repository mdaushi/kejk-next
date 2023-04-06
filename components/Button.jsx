import classNames from "classnames";

const Button = ({ bgColor, textColor, children, href, onClick }) => {
  return (
    <a
      href={href}
      className={classNames(
        `${bgColor} ${textColor} mb-4 flex items-center justify-center space-x-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium transition ease-in-out hover:border-teal-500 dark:border-neutral-700 
md:w-max md:text-base`
      )}
      onClick={onClick}
    >
      <button className="flex w-full items-center justify-center space-x-2">
        {children}
      </button>
    </a>
  );
};

export default Button;
