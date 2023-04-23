import { ErrorPageProps } from "$fresh/server.ts"
import Footer from "../components/Footer.tsx"
import Icon from "../components/Icon.tsx"

export default function Error(errorProps: ErrorPageProps) {
  const url = new URL(errorProps.url)
  const { error } = errorProps

  return (
    <div className="bg-red-100 w-screen h-screen flex flex-col justify-center items-center select-none font-mono">
      <div className="bg-red-50 flex flex-col justify-center items-center p-8 gap-4 rounded overflow-hidden shadow-lg w-1/2">
        <h1 className="uppercase font-bold text-4xl text-red-500 flex items-center gap-1">
          <Icon code="error" />
          ERROR
        </h1>
        <p class="w-full text-center">⛔ {(error as Error).message}</p>
        <img
          src="https://media.giphy.com/media/JzUE4TFMICFpOl1847/giphy.gif"
          width={200}
          className="rounded-xl shadow-lg "
          alt="Error giphy image"
        />
        <a
          className="bg-red-500 transition-colors duration-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-red-700 align-middle flex gap-1"
          href={`/${url.search}`}
        >
          <Icon code="undo" />
          RETURN
        </a>
      </div>
      <Footer></Footer>
    </div>
  )
}
