import classNames from "classnames";

const Button = ({ bgColor, textColor, children, href, onClick }) => {
  return (
    <a
      href={href}
      className={classNames(
        `${bgColor} ${textColor} mb-4 flex items-center justify-center space-x-2 rounded-xl border border-zinc-200 px-4 py-4 md:py-2 text-sm font-semibold transition ease-in-out hover:border-lime-500 dark:border-zinc-700 md:w-max md:text-base`
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
