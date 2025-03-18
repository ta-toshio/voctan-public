import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <hr className="mt-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-8"/>
      <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
        {/*
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h3>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className=" hover:underline">About</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Brand Center</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Blog</a>
              </li>
            </ul>
          </div>
        </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
        */}
        <div className="text-center">
          <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
            ©{process.env.NEXT_PUBLIC_SITE_NAME}
          </span>
          <ul className="flex justify-center mt-5 space-x-5">
            <li>
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
              >
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-conditions"
                className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
              >
                利用規約
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
