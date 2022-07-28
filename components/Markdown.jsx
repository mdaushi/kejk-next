import markdownStyles from "../styles/markdown-styles.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import classnames from "classnames";

const components = {
  a: (a) => {
    return (
      <a
        href={a.href}
        rel="noopener noreferrer"
        target="_blank"
        className="transition-opacity hover:opacity-70"
      >
        {a.children}
      </a>
    );
  },

  img: (image) => {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={400}
        height={300}
        quality={100}
        layout="responsive"
        objectFit="contain"
        objectPosition="center"
        className="rounded"
      />
    );
  },
};

const Markdown = ({ content, ...props }) => {
  return (
    <ReactMarkdown
      components={components}
      {...props}
      className={classnames(
        markdownStyles["markdown"],
        props.className ? props.className : null
      )}
    >
      {content}
    </ReactMarkdown>
  );
};
export default Markdown;
