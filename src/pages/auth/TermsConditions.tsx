import React from "react";
import { useNavigate } from "react-router-dom";

export default function TermsConditions() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-[700px] mx-auto h-[100dvh] px-6 pt-8">
      <h1 className="text-center mb-6 text-2xl font-semibold text-white dark:text-white">
        Text to Voice
      </h1>
      <div className="w-full h-[70dvh] p-6 space-y-4 whitespace-break-spaces break-words md:space-y-6 sm:p-8 overflow-y-auto bg-gray-100 rounded-lg shadow">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic quas
          magni suscipit optio dolor aperiam dolores, fuga ipsum nam, veniam
          minus numquam voluptas iure labore autem. Architecto perspiciatis
          nihil quis neque nam? Est sunt optio doloribus labore quasi impedit
          tenetur, sed mollitia aperiam, omnis deleniti eveniet ab porro et? Rem
          voluptatum ex commodi blanditiis praesentium sit! Quasi rem cupiditate
          accusantium molestias veritatis cumque soluta illo adipisci veniam,
          iure, ad cum et laudantium dignissimos laboriosam sequi repudiandae
          ullam aperiam magni! Maxime iste nobis nulla, porro tempora magnam
          similique illum provident, doloremque nisi dolorum consequatur! Nam
          magni atque nulla, totam consequuntur eveniet, doloremque enim impedit
          quis deleniti sit minus vero odit voluptatibus labore a? Accusamus
          iusto expedita aperiam quam similique deleniti fugiat, est quia hic
          accusantium, obcaecati blanditiis unde suscipit fuga amet perferendis
          enim totam repellendus molestiae! Accusantium et amet eius culpa, odio
          voluptatem dolorem sunt quaerat autem exercitationem impedit a
          nostrum, quas repellat aliquam? Voluptatem iste ut tempore, voluptate
          libero necessitatibus rerum accusamus sed! Sed, deleniti provident
          blanditiis aut vero optio, iusto hic similique molestias ipsam
          reiciendis mollitia veritatis odio voluptates eum minima in recusandae
          repellendus. Officiis voluptatem quasi maiores, sed necessitatibus
          earum libero temporibus voluptates laboriosam sit eum unde aliquid?
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/register${window?.location?.search}`)}
        className="w-full mt-5 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Ortga qaytish
      </button>
    </div>
  );
}