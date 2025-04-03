import Link from "next/link";

const SideBarLinkComponent = (props) => {
  return (
    <Link
      href={props.to}
      className="flex items-start justify-start gap-1 scale-150"
    >
      {props.icon}
      <span>{props.text}</span>
    </Link>
  );
};

export default SideBarLinkComponent;
