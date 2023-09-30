import React, { useEffect, useRef } from "react";
import { myAxios } from "@service/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { v4 } from "uuid";

// Redux store
import { useDispatch } from "react-redux";
import { userAuth } from "@store/store";

// Helpers
import { setAuthURL, setFormFields, trimValuesChecker } from "@helpers/index";

export default function Login() {
  const dispatch = useDispatch();
  const thisURLID: string = Cookies.get("$THIS$CURRENT$USER$") || v4();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formRef?.current?.email || !formRef?.current?.password) return;

    const params = new URLSearchParams(window?.location?.search);

    // Get the values of the email, password, and confirm-password parameters
    setFormFields(formRef, "email", "value", params?.get("email") || "");
    setFormFields(formRef, "password", "value", params?.get("password") || "");
  }, []);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const params = new URLSearchParams(window?.location?.search);

    // Set the values of the email, password, and confirm-password parameters
    params?.set(e?.currentTarget?.name, e?.currentTarget?.value);

    // Replace the current URL with the updated query parameters
    window?.history?.replaceState(null, "", `?${thisURLID}&browserId=${thisURLID}&${params?.toString()}&${thisURLID}`);

    setAuthURL(thisURLID);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    try {
      const response = await myAxios.post("/auth/login", formData);
      dispatch(userAuth({ data: response?.data, type: "LOGIN" }));
      toast.success(response?.data?.message, { position: "top-center" });

    } catch (error: any) {
      toast.warning(error?.response?.data?.message || "Internetingiz o'chiq yoki texnik xato yuz berdi, qayta urinib ko'ring.", { position: "top-center" });
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 pt-11 pb-7 mx-auto">
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
          Text to Voice
        </h1>
        <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Hisobga kirish
            </h1>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Elektron pochta
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:outline-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="johndoe@gmail.uz"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Parol
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:outline-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  onChange={handleChange}
                  minLength={12}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={()=> trimValuesChecker(formRef, "REGISTER")}
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Hisobga kirish
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Hisob ochilmaganmi?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Hisob ochish
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}