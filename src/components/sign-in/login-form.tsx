import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Button from "../ui/button";
import Divider from "../ui/divider";
import LoginCredentials from "./login-credentials";

const LoginForm = () => {
  return (
    <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40 pt-20 pb-10">
      <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
        <div className="rounded-xl bg-white shadow-xl">
          <div className="p-6 sm:p-16">
            <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Sign in.</h2>
            <LoginCredentials />
            <Divider text="Login with Providers" />
            <div className="mt-16 grid space-y-4">
              <Button className="w-full">
                <div className="relative flex items-center space-x-4 justify-center gap-2">
                  <FcGoogle className="absolute left-0 w-5" />
                  <span>Continue with Google</span>
                </div>
              </Button>
              <Button className="w-full">
                <div className="relative flex items-center space-x-4 justify-center gap-2">
                  <FaGithub className="absolute left-0 w-5 text-gray-700" />
                  <span>Continue with Github</span>
                </div>
              </Button>
              <Button className="w-full">
                <div className="relative flex items-center space-x-4 justify-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                    className="absolute left-0 w-5"
                    alt="Facebook logo"
                  />
                  <span>Continue with Facebook</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
