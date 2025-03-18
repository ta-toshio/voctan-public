import React from "react";
import { CircleDot } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    icon: <CircleDot fill="transparent" />,
    title: "PDF、YouTube字幕、Webページから簡単に英単語帳を作成",
    description: "",
  },
  {
    icon: <CircleDot />,
    title: "文脈そのままの例文で、単語の意味と使い方を深く理解",
    description: "",
  },
  {
    icon: <CircleDot />,
    title: "単語を出現順に章ごとに整理、学習の進捗が把握できる",
    description: "",
  },
  {
    icon: <CircleDot />,
    title: "フラッシュカードで効率的に単語を記憶",
    description: "実装予定",
  },
];

export const Services = () => {
  return (
    <div className="container py-12 sm:py-24">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          このサービスでできること
        </span>
      </h2>
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-stretch">
        {serviceList.map(({ icon, title, description }: ServiceProps) => (
          <Card key={title} className="h-full flex flex-col">
            <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
              <div className="mt-1 rounded-2xl hidden sm:block">
                {icon}
              </div>
              <div>
                <CardTitle className="tracking-normal leading-8">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
