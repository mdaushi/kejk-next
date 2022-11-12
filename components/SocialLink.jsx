const SocialLink = ({ title, href }) => {
  return (
    <a className="inline-link" href={href} target="_blank" rel="noreferrer">
      {title}
    </a>
  );
};

export default SocialLink;
