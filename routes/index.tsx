import { Head } from "$fresh/runtime.ts"
import Converter from "../islands/Converter.tsx"
import Footer from "../components/Footer.tsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>SQL Converter from Excel</title>
      </Head>
      <div class="p-4 mx-auto w-full sm:w-3/4 md:w-1/2">
        <Converter />
      </div>
      <Footer />
    </>
  )
}
