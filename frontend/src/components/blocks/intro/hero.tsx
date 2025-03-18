import Image from 'next/image'

export default function Hero() {
  return (
    <div
      className="grid lg:grid-cols-2 place-items-center pb-12 md:pb-20">
      <div className="py-6 md:order-1 hidden md:block">
        <Image
          src="/images/hero-flash.png"
          alt="Astronaut in the air"
          width={500}
          height={500}
          loading="eager"
          priority={true}
        />
      </div>
      <div>
        <h1
          className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter"
        >
          本から生まれる、新たな英単語帳
        </h1>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          自動で英単語を抽出し、簡単に調べられるから、読書体験がより豊かに。
          <wbr/>
          読書の楽しさを損なうことなく、語学の知識を自然に広げていきましょう。
        </p>
      </div>
    </div>
  )
}
