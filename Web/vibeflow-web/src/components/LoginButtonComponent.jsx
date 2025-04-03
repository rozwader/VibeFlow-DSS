import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";

const LoginButtonComponent = () => {
  return (
    <Link
      href={`/login/`}
      className="flex items-center bg-black rounded-xl text-white p-2 pl-5 pr-5 border border-black hover:bg-white hover:text-black transition-colors"
    >
      <BsFillPersonFill className="mr-1" />
      <span>Sign in</span>
    </Link>
  );
};

export default LoginButtonComponent;
