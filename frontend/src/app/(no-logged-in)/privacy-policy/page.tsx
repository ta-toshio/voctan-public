import { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: {
    index: false,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">プライバシーポリシー</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm">
          <p className="text-muted-foreground">最終更新日: 2024年9月30日</p>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">はじめに</h2>
            <p>
              本サービスは、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
              このプライバシーポリシーでは、本サービス利用時に収集される情報とその使用方法について説明します。
            </p>
          </section>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">収集する情報</h2>
            <p>本サービスが収集する情報には以下が含まれます：</p>
            <ul className="list-disc list-inside">
              <li>メールアドレス</li>
              <li>IPアドレス、ブラウザの種類、アクセス日時などの利用情報</li>
            </ul>
          </section>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">情報の使用目的</h2>
            <p>収集した情報は以下の目的で使用されます：</p>
            <ul className="list-disc list-inside">
              <li>本サービスの提供と改善</li>
              <li>カスタマーサポート</li>
            </ul>
          </section>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">情報の共有</h2>
            <p>
              本サービスは、ユーザーの同意がある場合や法的に必要とされる場合を除き、
              個人情報を第三者と共有することはありません。
            </p>
          </section>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">セキュリティ</h2>
            <p>
              本サービスは、ユーザーの個人情報を保護するために適切な技術的・組織的措置を講じています。
              ただし、インターネット上での完全なセキュリティを保証することはできません。
            </p>
          </section>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">免責事項</h2>
            <p>
              利用上の不具合・不都合に対して可能な限りサポートを行っておりますが、
              ユーザーが本サービスを利用して生じた損害に関して、開発元は責任を負わないものとします。
            </p>
          </section>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">変更</h2>
            <p>
              運営者は、このプライバシーポリシーを随時更新することがあります。
            </p>
          </section>

          <section className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">退会</h2>
            <p>
              退会を希望するユーザーはこちらの<Link href="/quit">リンク</Link>からお願いします。
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  )
}
