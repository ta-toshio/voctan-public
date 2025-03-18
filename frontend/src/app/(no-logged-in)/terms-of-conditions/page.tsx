import { Metadata } from 'next'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Terms of Conditions',
  robots: {
    index: false,
  },
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">利用規約</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm">
          <section className="mt-6 grid gap-4">
            <p>
              本サービスの利用については、本利用規約の全文をお読みいただいた上で、本利用規約に必ず同意頂く必要があります。
              <br/>
              なお、本利用規約は日本語を正文とし、日本語以外の言語による翻訳文は参考のために作成されるもので、日本語の正文のみが効力を有します。
            </p>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第１条 本利用規約について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本利用規約は、運営者が運営する「{process.env.NEXT_PUBLIC_SITE_NAME}」（以下、「本サービス」）
                に関するユーザーと運営者間の権利義務関係を定め、本サービスの利用に関する一切の関係に適用されます。
              </li>
              <li>ユーザーは、本利用規約に必ず同意の上で本サービスを利用する必要があります。</li>
              <li>
                運営者は、事前の通知なく本利用規約を変更することができます。変更後の利用規約が適用され、ユーザーは変更に同意したものとみなされます。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第２条 ユーザー登録</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスの利用を希望する者（以下「登録希望者」）は、本利用規約に同意し、運営者が定める方法で登録を申請できます。
              </li>
              <li>
                未成年者が本サービスを利用する場合、事前に法定代理人の同意を得る必要があります。未成年者の利用登録が行われた場合、法定代理人の同意があったものとみなします。
              </li>
              <li>
                登録希望者は、登録情報の不正確または虚偽により生じた不利益や損害について、運営者は一切の責任を負いません。
              </li>
              <li>
                運営者が不適切と判断した場合、登録を承認しないことがあります。また、理由の開示義務は負いません。
              </li>
              <li>ユーザー資格は登録が完了した時点で付与されます。</li>
              <li>ユーザーは、登録事項に変更があった場合、遅滞なく運営者に通知するものとします。</li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第３条 利用上の注意</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                ユーザーは、本サービスに関するパスワード及びユーザーIDを適切に管理し、以下の事項を遵守します。
                <br/>
                a. パスワードやIDを第三者に公開、利用させないこと。
                <br/>
                b. 容易に推測されないパスワードとすること。
                <br/>
                c. 複数人が使用する端末での利用後はログアウトし、ブラウザを終了させること。
              </li>
              <li>登録されたパスワードやIDによる利用は、本人の利用とみなし、責任はユーザーに帰属します。</li>
              <li>パスワードやIDの不正使用による損害について、ユーザーは賠償責任を負います。</li>
              <li>
                ユーザー投稿情報は運営上の必要に応じて閲覧・削除されることがあり、必要に応じて公的機関に提供されます。
              </li>
              <li>
                本サービスの利用に必要な機器や通信手段は、ユーザーの責任と費用で準備します。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第４条 決済について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスは一部無料で提供されますが、有料サービスについては、運営者が定める料金を支払う必要があります。
              </li>
              <li>
                プレミアム会員に登録するユーザーは、AppleまたはGoogleの決済規約に従います。
              </li>
              <li>
                翻訳者に添削依頼サービスを利用するユーザーは、Stripeエンドユーザー利用規約に同意する必要があります。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第５条 個人情報について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                ユーザーの登録情報は、運営者が定めるプライバシーポリシーに従い、適正に取り扱われます。
              </li>
              <li>
                運営者は、本サービスに関する統計データを収集し、使用・保存・公表することができます。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第６条 権利帰属について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                ユーザーは、自ら著作権等の知的財産権を有するか、または必要な権利者の許諾を得た情報のみ投稿するものとします。
              </li>
              <li>
                ユーザー投稿情報の著作権はユーザーに留保されますが、運営者は無償でこれを利用するライセンスを付与されます。
              </li>
              <li>
                本サービスに関連する情報や著作権はすべて運営者に帰属し、ユーザーはこれらを無断で利用してはなりません。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第７条 禁止行為について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                <br/>
                a. 法令違反または犯罪行為。
                <br/>
                b. 知的財産権、肖像権、プライバシー権等の侵害。
                <br/>
                c. わいせつ・差別的・暴力的表現の掲載。
                <br/>
                d. 商業行為（物やサービスの売買・宣伝等）。
                <br/>
                e. 個人情報の掲載。
                <br/>
                f. サーバーに過度の負荷をかける行為。
              </li>
              <li>
                運営者が禁止行為に該当すると判断した場合、事前通知なく該当箇所の削除や利用停止などの措置を行うことがあります。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第８条 本サービスの停止等</p>

            <p>
              運営者は、以下の場合に事前通知なく、本サービスを変更、停止または中止することができます。
              <br/>
              a. システムの点検・保守作業を行う場合。
              <br/>
              b. システムや通信回線の障害が発生した場合。
              <br/>
              c. 地震や天災等の不可抗力により運営ができなくなった場合。
              <br/>
              d. その他、運営者が必要と判断した場合。
            </p>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第９条 保証及び免責</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                運営者は、本サービスが全ての機器・地域で利用可能であることを保証しません。また、データの喪失についても保証しません。
              </li>
              <li>本サービスの利用に関する損害について、運営者は一切責任を負いません。</li>
              <li>ただし、運営者に故意または重過失がある場合はこの限りではありません。</li>
              <li>運営者の責任が生じる場合、賠償責任は支払額の総額を限度とします。</li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第１０条 ユーザーによる紛争の解決</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>ユーザー間の紛争は、当事者間で責任を持って解決します。</li>
              <li>
                第三者との紛争も、当事者であるユーザーが責任を持って解決し、損害が生じた場合は賠償します。
              </li>
              <li>
                投稿・編集した情報に起因するクレームや請求については、ユーザーが責任を持って対応します。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第１１条 登録の抹消について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                運営者は、ユーザーが利用規約に違反した場合や不適切と判断した場合、登録情報を削除したり、利用停止、ユーザー資格の停止・剥奪を行うことができます。
              </li>
              <li>
                この措置による損害について、運営者は一切責任を負いません。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第１２条 退会について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                ユーザーが退会を希望する場合、運営者の定める方法で退会申請を行います。
              </li>
              <li>
                退会時に債務がある場合、ユーザーはすべての債務を運営者に支払わなければなりません。
              </li>
              <li>
                退会後、運営者はユーザーの個人情報や投稿情報を保持する義務はありません。
              </li>
              <li>
                ユーザーが死亡した場合、ユーザー資格は相続されず、退会したものとみなされます。
              </li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第１３条 本サービスの内容の変更、終了</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>運営者は、サービス内容を変更または提供を終了することができます。</li>
              <li>その場合、運営者は損害賠償の責任を負いません。</li>
            </ol>
          </section>

          <section className="mt-6 grid gap-4">
            <p className="font-bold">第１４条 紛争処理について</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>運営者とユーザー間の紛争は、さいたま地方裁判所を専属的合意管轄とします。</li>
              <li>準拠法は日本法とします。</li>
              <li>
                本利用規約の一部が無効または執行不能と判断されても、残りの部分は引き続き効力を有します。
              </li>
            </ol>
          </section>

        </CardContent>
      </Card>
    </div>
  )
}
