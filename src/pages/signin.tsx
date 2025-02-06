import { SignInForm } from "@/components/auth/signin/signInForm";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserData } from "./types";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

function parseJWT(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return {
    header,
    payload,
    signature: parts[2],
  };
}
export function SigninPage() {
  const { login } = useAuth();
  return (
    <div className="flex max-w-[1280px] mx-auto  w-full h-screen justify-center items-center  ">
      <div className="bg-gray-900 p-8 flex flex-col gap-16 lg:flex-row justify-center items-center rounded-2xl">
        <img
          src="/illustrations/login.png"
          alt="logo"
          width={300}
          height={500}
        />
        <div className="flex  flex-col bg-mantle items-center gap-4 justify-center w-fit h-fit p-8 rounded shadow-xl">
          <div className="flex items-center gap-2 shadow-xl rounded-2xl ">
            <h2 className="text-xl font-bold">Upliance</h2>
          </div>

          {/* <SignInForm /> */}
          {/* <div className="flex items-center gap-4 mt-4 justify-center">OR</div> */}
          <button
            onClick={async () => {
              login();
            }}
            className="flex items-center justify-center bg-gray-700 py-2 gap-2 text-crust px-4 rounded w-fit cursor-pointer hover:bg-crust hover:text-white "
          >
            <p className="text-sm ">Sign in with </p>
            <img
              className=""
              src="/images/google.svg"
              alt="google"
              width={24}
              height={24}
            />
          </button>

          {/* <div className="flex items-center gap-2 mt-4">
            New to Upliance ?{" "}
            <Link to="/signup">
              <span className="text-teal-500">Sign up</span>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
