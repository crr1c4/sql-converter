import { Head } from "$fresh/runtime.ts"
import { Handlers, PageProps } from "$fresh/server.ts"
import Footer from "../components/Footer.tsx"
import Button from "../islands/Button.tsx"

// TODO: ADD TESTS!!!

interface FormProps {
  title: string
  datatypes: string
  records: string
}

export const handler: Handlers<FormProps> = {
  async POST(req) {
    const form = await req.formData()
    const query = new URLSearchParams()
    const headers = new Headers()

    query.set("title", form.get("title")?.toString()!)
    query.set("datatypes", form.get("datatypes")?.toString()!)
    query.set("records", form.get("records")?.toString()!)
    headers.set("location", "/results?" + query.toString())

    return new Response(null, {
      status: 303,
      headers,
    })
  },
  GET(req, ctx) {
    const url = new URL(req.url)
    const title = url.searchParams.get("title") || ""
    const datatypes = url.searchParams.get("datatypes") || ""
    const records = url.searchParams.get("records") || ""

    return ctx.render({ title, datatypes, records })
  },
}

export default function Index({ data }: PageProps<FormProps>) {
  const { datatypes, records, title } = data
  const help = `Data types' field need a list of numbers, for example: 1, 0, 0, 0, 1...\n    - use 0 for numbers.\n    - use 1 for strings.`

  return (
    <>
      <Head>
        <title>SQL Converter from Excel</title>
      </Head>
      <div className="p-4 mx-auto w-screen h-screen bg-green-100 flex flex-col items-center justify-between font-mono">
        <form
          method="post"
          className=" sm:w-3/4 md:w-1/2 w-full flex flex-col gap-4 p-4 justify-center items-center rounded overflow-hidden shadow-lg bg-green-50"
        >
          <h1 class="font-bold text-2xl text-center">
            Convert Excel tables to SQL INSERT INTO records
          </h1>
          <input
            type="text"
            name="title"
            value={title}
            required
            placeholder="Table name"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
          <textarea
            name="records"
            required
            rows={10}
            value={records}
            placeholder="Raw data from excel"
            className="text-xs resize-y w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none"
          ></textarea>
          <div className="w-full grid grid-cols-8 gap-4">
            <input
              type="text"
              name="datatypes"
              required
              value={datatypes}
              placeholder="Data types"
              className=" shadow appearance-none border rounded col-span-6 sm:col-span-7 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />

            <div className="col-span-2 sm:col-span-1">
              <Button message={help} value="?"></Button>
            </div>
          </div>
          <div className="flex gap-4">
            <input
              type="submit"
              value="Transform"
              className="bg-green-500 transition-colors duration-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-green-700"
            />

            <button className="bg-green-500 transition-colors duration-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-green-700">
              <a href="/">Delete</a>
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </>
  )
}
