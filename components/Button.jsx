import classNames from "classnames";

const Button = ({ bgColor, textColor, children, href, onClick }) => {
  return (
    <div
      href={href}
      className={classNames(
        `${bgColor} ${textColor} flex w-max cursor-pointer items-center justify-center space-x-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium transition ease-in-out hover:border-teal-500 md:text-base`
      )}
      onClick={onClick}
    >
      <button className="flex w-full items-center justify-center space-x-2">
        {children}
      </button>
    </div>
  );
};

export default Button;
