import { RocketIcon } from "../src/assets/rocket"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="w-full flex items-center justify-center h-52 bg-[#0D0D0D]">
          <RocketIcon className="w-5.5 h-9 mr-2" />
          <h1 className="font-inter font-black text-4xl text-[#64A7D9]">Todo</h1>
          <h1 className="font-inter font-black text-4xl text-[#5D63C7]">App</h1>
        </header>
        <div className="w-screen h-screen flex justify-center items-start bg-[#1A1A1A]">
          <div className="w-1/2 flex flex-col items-center justify-center bg-transparent">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
