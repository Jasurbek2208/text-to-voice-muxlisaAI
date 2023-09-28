import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myAxios } from "../../service/axios";

// Components
import Loader from "../../components/loader/Loader";

// Helpers
import { verifyAccount } from "../../helpers/verifyAccount";

// Types
interface IVerifiedStatus {
  name: string;
  email: string;
  status: number;
  verificationStatus: string;
}

export default function SuccessRegistered() {
  const params = new URLSearchParams(window?.location?.search)?.get("verify-uuid");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonResponse, setButtonResponse] = useState<string>("");
  const [verifyStatus, setVerifyStatus] = useState<IVerifiedStatus | null>(null);

  async function verify(param: string) {
    setIsLoading(true);
    const response: IVerifiedStatus = await verifyAccount(param);
    setVerifyStatus(response);
    setIsLoading(false);
  }

  async function sendVerify() {
    const formData = new FormData();
    formData.append("email", verifyStatus?.email || localStorage.getItem("success-registered") || "");

    try {
      await myAxios.post('/auth/sendVerify', formData);
      const a = document.createElement("a");
      a.href = "/success-registered";
      a.click();

    } catch {
      setButtonResponse("Texnik xato yuz berdi! Qayta urinib ko'ring!")
    }
  }

  useEffect(() => {
    if (params) verify(params);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="flex flex-col items-center justify-center px-6 pt-11 pb-7 mx-auto">
      <h1 className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
        Text to Voice
      </h1>
      <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-10 sm:p-12">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {verifyStatus?.status === 200
              ? "Elektron pochta tasdiqlandi!"
              : verifyStatus?.status === 500
              ? "Elektron pochta tasdiqlanmadi!"
              : "Hisob deyarli ochildi!"}
          </h1>
          <br />
          <p
            className={`text-sm text-center font-semibold ${
              verifyStatus?.status === 500 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {verifyStatus?.email ||
              localStorage.getItem("success-registered") ||
              "Elektron pochta topilmadi!"}
          </p>
          <p
            className={`text-base font-bold text-center ${
              verifyStatus?.status === 500 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {verifyStatus?.verificationStatus ||
              "Ushbu elektron pochtangizga xabar yubordik."}
          </p>
          <p className="text-sm mt-3 text-center text-gray-900 dark:text-white">
            {verifyStatus?.status === 200 ? (
              `Hurmatli, ${
                verifyStatus?.name || "foydalanuvchi"
              }! Sizning elektron pochtangiz muvofaqqiyatli tasdiqlandi va saytda siz uchun hisob ochildi. Hisobga kirish uchun pastdagi "Hisobga kirish" tugmasini bosib, "Hisobga kirish" sahifasiga o'tasiz va profilingiz uchun kiritgan "email" va "parol"laringizni kiritgan holda o'z hisobingizga kirishingiz mumkin.`
            ) : verifyStatus?.status === 500 ? (
              `Sizning elektron pochtangiz tasdiqlanmadi. Bunga sabab esa siz bu yerga kirgan linkingiz allaqachon eskirgan. Qayta tasdiqlash linkini yuborish uchun pastdagi "Elektron pochtani qayta tasdiqlash" tugmasini bosib, elektron pochtangizga kelgan maxsus linkga o'tishingiz kerak.`
            ) : (
              <>
                Xabardagi link orqali ushbu elektron pochta sizniki ekanligini
                tasdiqlashingiz kerak. Elektron pochtani tasdiqlashingiz bilan
                hisob ochiladi. <br />
                <b className="text-center text-red-600">Eslatib o'tamiz:</b>
                <br />5 daqiqa ichida elektron pochtani tasdiqlamasangiz,
                tasdiqlash linki eskiradi va yana qaytadan ma'lumotlarni
                kiritishingizga to'g'ri keladi!
              </>
            )}
          </p>
          {verifyStatus?.status === 200 ? (
            <div className="flex justify-center mt-6">
              <Link
                to="/login"
                className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Hisobga kirish
              </Link>
            </div>
          ) : (
            <div className="mt-6">
              {verifyStatus?.status === 500 ? null : <p className="text-center text-sm font-semibold mt-2 text-blue-600">Xabar kelmadimi?</p>}
              <div className="flex justify-center">
                <button
                  onClick={sendVerify}
                  className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {verifyStatus?.status === 500 ? "Elektron pochtani qayta tasdiqlash" : "Tasdiqlash xabarini qayta yuborish"}
                </button>
              </div>
            </div>
          )}
          {buttonResponse && <p className="text-center text-sm mt-2 text-red-600">{buttonResponse}</p>}
        </div>
      </div>
    </section>
  );
}