import { SignUpForm } from "@/components/auth/signup/signupForm";
import { Link } from "react-router-dom";

export function SignupPage() {
  return (
    <div className="flex max-w-[1280px] mx-auto  w-full h-screen justify-center items-center  ">
      <div className="bg-gray-900 p-8 flex flex-col gap-16 lg:flex-row justify-center items-center rounded-2xl">
        <div className="flex flex-col items-center gap-4 justify-between w-fit h-full">
          <h3 className="text-2xl font-bold  italic">Explore Possiblities</h3>
          <h3 className="text-2xl font-bold  italic"> Beyond Imagination</h3>
          <img
            src="/illustrations/login.png"
            alt="logo"
            width={300}
            height={500}
          />
        </div>
        <div className="flex  flex-col bg-mantle items-center gap-4 justify-center w-fit h-fit p-8 rounded shadow-xl">
          <div className="flex items-center gap-2 shadow-xl rounded-2xl ">
            <h2 className="text-xl font-bold">Upliance</h2>
          </div>

          <SignUpForm />
          <div className="flex items-center gap-4 mt-4 justify-center">
            {/* <div className="bg-white h-[1px] w-full flex rounded"></div> */}
            OR
            {/* <div className="bg-white h-1 w-full flex rounded"></div> */}
          </div>
          <button
            onClick={async () => {
              "use server";
              //   const res = await signIn("google");
              console.log(
                // res,
                "res..............................................................................................."
              );
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
          <div className="flex items-center gap-2 mt-4">
            Already have an account ?{" "}
            <Link to="/signin">
              <span className="text-teal-500">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
