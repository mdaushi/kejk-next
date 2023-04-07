import Link from "next/link";

const AlertPreview = () => {
  return (
    <div className="fixed left-0 top-0 z-20 w-full bg-zinc-100 px-8 dark:bg-zinc-900 md:top-16">
      <div className="py-3 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
        <>Preview mode</>
      </div>
    </div>
  );
};
export default AlertPreview;
