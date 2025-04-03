import Link from "next/link";

const SideBarLinkComponent = (props) => {
  return (
    <Link
      href={props.to}
      className="flex items-center gap-2 text-gray-700 hover:bg-gray-200 rounded-lg py-2 px-4 w-full"
    >
      {props.icon}
      <span>{props.text}</span>
    </Link>
  );
};

export default SideBarLinkComponent;
