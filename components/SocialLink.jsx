import Link from "next/link"

const SocialLink = ({ children, href }) => {
  return (
  <Link href={href}>
    <a className="inline-link" href={href} target="_blank" rel="noreferrer">{children}</a></Link>
  )
}

export default SocialLink