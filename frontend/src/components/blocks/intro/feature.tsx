import Image from "next/image";


const Feature = () => {
  return (
    <div className="grid grid-flow-row gap-8">
      <div className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div className="not-prose relative flex justify-center overflow-hidden rounded-lg">
          <Image
            src="/images/feature5.png"
            width={350}
            height={350}
            alt="feature1"
            className="fill object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 py-8">
          <h3 className="text-3xl text-gray-800 font-bold mb-3">
            単語の意味が分かるからこそ、読書がもっと楽しめる
          </h3>
          <p className="text-lg text-gray-600 mb-8 text-justify">
            本を読みながら、わからない英単語をすぐに調べられるから、ストーリーを止めずに楽しめます。
            読書しながら語彙を増やせて、英語の勉強にもなる新しい読書体験を提供します。
          </p>
        </div>
      </div>
      <div className="grid  col-reverse items-stretch md:grid-cols-2 md:gap-12">
        <div className="not-prose relative flex justify-center overflow-hidden rounded-lg md:order-last">
          <Image
            src="/images/feature3.png"
            width={457}
            height={350}
            alt="feature1"
            className="fill object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 py-8">
          <h3 className="text-3xl text-gray-800 font-bold mb-3">
            新しい言葉、ポケットにしまっておけばいつでも取り出せる
          </h3>
          <p className="text-lg text-gray-600 mb-8 text-justify">
            散らばりがちなメモやノートとは違い、簡単に整理して持ち運べる便利さが手に入ります。
            読書の中で得た知識を整理し、いつでも手元にある感覚で覚えられます。
          </p>
        </div>
      </div>
      <div className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div className="not-prose relative flex justify-center overflow-hidden rounded-lg">
          <Image
            src="/images/feature6.png"
            width={350}
            height={350}
            alt="feature1"
            className="fill object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 py-8">
          <h3 className="text-3xl text-gray-800 font-bold mb-3">
            文脈とリンクして理解が深まる
          </h3>
          <p className="text-lg text-gray-600 mb-8 text-justify">
            このサービスでは、テキストの文章をそのまま例文として使用し、単語の意味や使い方を文脈と一緒に学べます。
            文脈に結びつけて学ぶことで、その単語を使うシチュエーションまでイメージでき、知識が記憶に長く残る学習方法を実現します。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
