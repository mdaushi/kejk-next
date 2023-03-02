import markdownStyles from "../styles/markdown-styles.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import classnames from "classnames";

const components = {
  a: (a) => {
    return (
      <a href={a.href} rel="noopener noreferrer" target="_blank">
        {a.children}
      </a>
    );
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const childRegex = String(children).replace(/\n$/, "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={materialDark}
        language={match[1]}
        wrapLongLines="true"
        {...props}
      >
        {childRegex}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
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
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};
export default Markdown;
