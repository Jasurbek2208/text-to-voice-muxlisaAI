// Types
interface IPresentation {
  presentationType: 'textToVoice' | 'voiceToText'
}

export default function Presentation({ presentationType }: IPresentation) {
  return (
    <div className="w-full h-full flex place-items-center">
      <div className="p-7 sm:w-[450px] w-11/12 h-max m-auto border border-gray-600 rounded-2xl shadow-lg">
        <p className="text-gray-600 dark:text-gray-300 font-mono duration-300">
          {presentationType === 'textToVoice'
            ? `Kerakli xabarni yuboring va sizga yuborgan xabaringiz ovozli xabar
          ko'rinishida qayta yuboriladi. Ko'pi bilan bitta xabarda 500 ta belgi
          bo'lish kerak. Aks holda xabarni yuboraolmaysiz. Xabarlarni yuborishda
          e'tiborliroq bo'ling, hatto belgilar orasidagi bo'shliq ham to'liq bir
          belgi hisoblaniladi va limitga ta'sir qiladi.`
            : `Kerakli ovozli xabarni yuboring va sizga yuborgan xabaringiz ovozli xabar
          ko'rinishida qayta yuboriladi. Ko'pi bilan bitta xabarda 500 ta belgi
          bo'lish kerak. Aks holda xabarni yuboraolmaysiz. Xabarlarni yuborishda
          e'tiborliroq bo'ling, hatto belgilar orasidagi bo'shliq ham to'liq bir
          belgi hisoblaniladi va limitga ta'sir qiladi.`}
        </p>
      </div>
    </div>
  )
}