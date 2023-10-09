import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 } from "uuid";

// Helpers
import { setAuthURL } from "@helpers/index";

export default function TermsConditions() {
  const navigate = useNavigate();
  const thisURLID: string = Cookies.get("$THIS$CURRENT$USER$") || v4();

  const checkboxRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>(window?.location?.search);

  
  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    setSearch(`?${params?.toString()}`);
    
    // Get the values of the email, password, and confirm-password parameters
    (checkboxRef?.current as any).checked = JSON.parse(String(params?.get("terms")));
  }, []);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const params = new URLSearchParams(window?.location?.search);
    
    // Set the values of the email, password, and confirm-password parameters
    const value = e?.currentTarget?.type === "checkbox" ? (e?.currentTarget?.checked) : e?.currentTarget?.value
    params?.set(e?.currentTarget?.name, String(value));

    // Replace the current URL with the updated query parameters
    setSearch(`?${params?.toString()}`)
    window?.history?.replaceState(null, "", `?${thisURLID}&browserId=${thisURLID}&${params?.toString()}&${thisURLID}`);

    setAuthURL(thisURLID);
  }

  return (
    <div className="w-full max-w-[700px] mx-auto h-[100dvh] px-6 pt-8">
      <h1 className="text-center mb-6 text-2xl font-semibold text-zinc-950 dark:text-white">
        Text to Voice
      </h1>
      <div className="w-full h-[70dvh] p-6 space-y-4 whitespace-break-spaces break-words md:space-y-6 sm:p-8 overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-center text-blue-600 text-xl font-bold">Foydalanish shartlari:</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Assalomu alaykum. Siz <a href="https://text-to-voice-muxlisa-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600">texttovoice.uz</a> saytidan foydalanishingiz uchun oldin ushbu saytdan ro'yxatdan o'tishingiz va quyidagi foydalanish shartlari bilan tanishib chiqib, <b>"Men Foydalanish shartlarni qabul qilaman"</b> deb yozilgan belgilash katagini yoqqan holda ushbu shartlarga rozilik bildirishingiz kerak: <br /><br />Ushbu saytdan ro'yxatdan o'tib siz o'zingiz kiritgan ma'lumotlaringiz bizning ma'lumotlar bazamizda saqlanishi va saytdagi faoliyatingizda(to'lov qilishda, pullik xizmatlardan foydalanishda) ishlatilishi mumkin. Va bu ishlarning barchasi sizning ushbu saytdagi profilingiz xavfsizligi ta'minlanishi uchun qaratilgan. <b>To'lov qilinganidan so'ng, pullar ortga qaytarilmaydi, chunki siz bunga rozilik bildirgansiz, shuni unutmang!</b>
        </p>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              ref={checkboxRef}
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
              <label htmlFor="terms" className="font-medium text-blue-600 dark:text-primary-500">
                Foydalanish shartlarni{" "}
              </label>
              qabul qilaman
            </label>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/register${search}`)}
        className="w-full mt-5 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Ortga qaytish
      </button>
    </div>
  );
}