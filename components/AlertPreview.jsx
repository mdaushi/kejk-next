import Link from "next/link";

const AlertPreview = () => {
  return (
    <div className="fixed top-0 left-0 z-20 w-full bg-neutral-100 px-8 dark:bg-neutral-800 md:top-16">
      <div className="py-3 text-center text-sm font-medium text-neutral-900 dark:text-neutral-50">
        <>Preview mode</>
      </div>
    </div>
  );
};
export default AlertPreview;
