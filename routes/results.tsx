import { Handlers, PageProps } from "$fresh/server.ts"
import Footer from "../components/Footer.tsx"

interface Results {
  records: string[]
}

enum dataTypes {
  number = 0,
  string = 1,
  // date = 2,
}

const DATATYPES_LENGTH = Object.keys(dataTypes).length / 2

export const handler: Handlers<Results> = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const title = url.searchParams.get("title")!
    const datatypes = url.searchParams.get("datatypes")!
    const rawRecords = url.searchParams.get("records")!

    if (datatypes.trimEnd().endsWith(","))
      throw new Error(
        'Invalid value passed to datatypes field, you forgot pass the last number. The field value ends with ",".'
      )

    const dataTypesNumberList: number[] = datatypes
      .trim()
      .split(",")
      .map((n) => Number(n.trim()))

    dataTypesNumberList.forEach((element, index) => {
      if (isNaN(element))
        throw new Error(
          `Invalid value passed to datatypes field at index ${index}: ${element}.`
        )

      if (element < 0 || element >= DATATYPES_LENGTH)
        throw new Error(
          `Invalid value passed to datatypes field at index ${index}: ${element}, it must be a value between [0, ${
            DATATYPES_LENGTH - 1
          }].`
        )
    })

    const dataTypesList = dataTypesNumberList.map((n) => n as dataTypes)
    const rawRows = rawRecords.trim().split("\n")

    const data = rawRows.map((row) =>
      row.split("\t").map((element, index) => {
        switch (dataTypesList[index]) {
          case dataTypes.number:
            return element
          case dataTypes.string:
            return `"${element.trimEnd()}"`
          // * Code here for future types!!
        }
      })
    )

    data.forEach((line, index) => {
      if (line.length !== dataTypesList.length)
        throw new Error(
          `Invalid data in excel field, check data in line ${index} on excel field.`
        )
    })

    const lines = data.map(
      (line) => `INSERT INTO ${title} VALUES (${line.join(", ").trim()});`
    )

    return ctx.render({ records: lines })
  },
}

export default function Results({ data }: PageProps<Results>) {
  const { records } = data

  return (
    <div className="bg-green-100 w-screen h-screen flex flex-col justify-center items-center font-mono">
      <div className="bg-green-50 flex flex-col justify-center items-center p-8 gap-4 rounded overflow-hidden shadow-lg">
        <h1 className="text-3xl font-bold select-none">Results</h1>
        <ul>
          {records.map((record) => (
            <li className="font-medium text-md">{record}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}
