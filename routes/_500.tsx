import { ErrorPageProps } from "$fresh/server.ts"
import Footer from "../components/Footer.tsx"

export default function Error(errorProps: ErrorPageProps) {
  const url = new URL(errorProps.url)
  const { error } = errorProps

  return (
    <div className="bg-red-100 w-screen h-screen flex flex-col justify-center items-center select-none font-mono">
      <div className="bg-red-50 flex flex-col justify-center items-center p-8 gap-4 rounded overflow-hidden shadow-lg w-1/2">
        <h1 className="uppercase font-bold text-4xl text-red-500">ERROR</h1>
        <p class="w-full text-center">⛔ {(error as Error).message}</p>
        <img
          src="https://media.giphy.com/media/JzUE4TFMICFpOl1847/giphy.gif"
          width={200}
          className="rounded-xl shadow-lg "
          alt="Error giphy image"
        />
        <a className="underline hover:text-red-500" href={`/${url.search}`}>
          return
        </a>
      </div>
      <Footer></Footer>
    </div>
  )
}
