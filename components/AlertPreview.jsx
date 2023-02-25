import Link from "next/link";

const AlertPreview = () => {
  return (
    <div className="text-fore-subtle bg-back-subtle absolute top-28 left-0 z-20 w-full px-8 md:top-20">
      <div className="py-2 text-center text-sm">
        <>
          You&apos;re in preview mode.{" "}
          <Link
            href="/api/exit-preview"
            className="hover:text-accent cursor-pointer underline transition-colors"
          >
            Click here
          </Link>{" "}
          to exit.
        </>
      </div>
    </div>
  );
};
export default AlertPreview;
