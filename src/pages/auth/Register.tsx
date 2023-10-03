import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { myAxios } from "@service/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { v4 } from "uuid";

// Helpers
import { setAuthURL, setFormFields, requestToSendVerify, trimValuesChecker } from "@helpers/index";

export default function Register() {
  const thisURLID: string = Cookies.get("$THIS$CURRENT$USER$") || v4();

  const [search, setSearch] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (
      !formRef?.current?.name ||
      !formRef?.current?.surname ||
      !formRef?.current?.birthday ||
      !formRef?.current?.email ||
      !formRef?.current?.terms ||
      !formRef?.current?.password ||
      !formRef?.current?.["confirm-password"]
    )
      return;

    const params = new URLSearchParams(window?.location?.search);
    setSearch(`?${params?.toString()}`);

    // Get the values of the email, password, and confirm-password parameters
    setFormFields(formRef, "name", "value", params?.get("name") || "");
    setFormFields(formRef, "surname", "value", params?.get("surname") || "");
    setFormFields(formRef, "birthday", "value", params?.get("birthday") || "");
    setFormFields(formRef, "email", "value", params?.get("email") || "");
    setFormFields(formRef, "password", "value", params?.get("password") || "");
    setFormFields(formRef, "confirm-password", "value", params?.get("confirm-password") || "");
    setFormFields(formRef, "terms", "checked", JSON.parse(String(params?.get("terms"))) || "");
  }, []);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const params = new URLSearchParams(window?.location?.search);

    // Set the values of the email, password, and confirm-password parameters
    const value =
      e?.currentTarget?.type === "checkbox"
        ? e?.currentTarget?.checked
        : e?.currentTarget?.value;
    params?.set(e?.currentTarget?.name, String(value));

    // Replace the current URL with the updated query parameters
    setSearch(`?${params?.toString()}`);
    window?.history?.replaceState(
      null,
      "",
      `?${thisURLID}&browserId=${thisURLID}&${params?.toString()}&${thisURLID}`
    );

    setAuthURL(thisURLID);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setFormFields(formRef, "surname", "value", e.currentTarget?.surname?.value?.trim());
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = e?.currentTarget?.email?.value;

    try {
      const response = await myAxios.post("/auth/register", formData);
      console.log(response);
      
      localStorage.setItem("success-registered", email || "");
      await requestToSendVerify(email || "");

    } catch (error: any) {
      toast.warning(error?.response?.data?.message || "Internetingiz o'chiq yoki texnik xato yuz berdi, qayta urinib ko'ring.", { position: "top-center" });
    }
  }

  return (
    <section className="flex flex-col items-center justify-center px-6 pt-11 pb-7 mx-auto">
      <h1 className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
        Text to Voice
      </h1>
      <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Hisob ochish
          </h1>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ism
              </label>
              <input
                type="name"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:outline-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Familiya
              </label>
              <input
                type="surname"
                name="surname"
                id="surname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:outline-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tug'ilgan sana
              </label>
              <input
                type="birthday"
                name="birthday"
                id="birthday"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:outline-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="22.08.2004"
                onChange={handleChange}
                required
              />
            </div>
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
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:outline-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                onChange={handleChange}
                disabled={
                  !formRef?.current?.password?.value ||
                  formRef?.current?.password?.value?.length < 12
                }
                required
              />
              {formRef?.current?.password?.value?.length < 12 ? (
                <div className="mt-2 flex items-center">
                  <i className="fa-solid fa-circle-exclamation text-blue-600" />
                  <span className="ml-1 text-sm text-blue-600">
                    Kamida 12 ta belgilik parol kiriting
                  </span>
                </div>
              ) : formRef?.current?.["confirm-password"]?.value ?
                formRef?.current?.["confirm-password"]?.value !==
                  formRef?.current?.password?.value ? (
                <div className="mt-2 flex items-center">
                  <i className="fa-solid fa-circle-exclamation text-red-600" />
                  <span className="ml-1 text-sm text-red-600">
                    Parol mos kelmadi
                  </span>
                </div>
              ) : (
                <div className="mt-2 flex items-center">
                  <i className="fa-solid fa-circle-check text-green-600" />
                  <span className="ml-1 text-sm text-green-600">
                    Parol mos keldi
                  </span>
                </div>
              ) : (
                <div className="mt-2 flex items-center">
                  <i className="fa-solid fa-circle-exclamation text-blue-600" />
                  <span className="ml-1 text-sm text-blue-600">
                    Parolni tasdiqlash uchun qayta kiriting
                  </span>
                </div>
              ) }
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  name="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-600 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  Men{" "}
                  <Link
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    to={`/terms-and-conditions${search}`}
                  >
                    Foydalanish shartlarni{" "}
                  </Link>
                  qabul qilaman
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 disabled:bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              disabled={
                formRef?.current?.["confirm-password"]?.value &&
                formRef?.current?.["confirm-password"]?.value !==
                  formRef?.current?.password?.value
              }
              onClick={()=> trimValuesChecker(formRef, "REGISTER")}
            >
              Hisobni ochish
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Hisobingiz bormi?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline dark:text-primary-500"
              >
                Hisobga kirish
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}