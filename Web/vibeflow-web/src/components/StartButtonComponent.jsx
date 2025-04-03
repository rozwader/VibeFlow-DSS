import Link from "next/link";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";

const StartButtonComponent = (props) => {
  return (
    <Link href={props.destination} className="flex items-center">
      <div className="flex items-center border border-black p-2 pl-5 pr-5 hover:bg-purple-500 hover:text-white hover:border-white scale-150 transition-colors">
        <BsMusicNoteBeamed className="mr-1" />
        <span>Start Your Journey</span>
        <BsArrowUpRight className="ml-1" />
      </div>
    </Link>
  );
};

export default StartButtonComponent;
