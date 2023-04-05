import { useState } from "preact/hooks"
import PopUp from "../components/PopUp.tsx"
import Error from "../components/Error.tsx"

export enum dataTypes {
  number = 0,
  string = 1,
}

export default function Converter() {
  const [tableName, setTableName] = useState<string>()
  const [types, setTypes] = useState<dataTypes[]>()

  const [rawRecords, setRawRecords] = useState<string>()
  const [records, setRecords] = useState<string[]>([])

  const [help, showHelp] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [typeError, setTypeError] = useState("")
  const [error, setError] = useState("")

  /**
   * Handler for table name input.
   */
  function handleTableName(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    setTableName(target.value)
  }

  function handleTypes(e: Event) {
    try {
      setTypeError("")
      e.preventDefault()
      const target = e.target as HTMLInputElement

      const data = target.value
        .trim()
        .split(",")
        .map((n) => Number(n.trim()))

      if (
        data.findIndex((n) => (n !== 0 && n !== 1) || isNaN(n)) !== -1 ||
        target.value.trim().endsWith(",")
      ) {
        throw "Invalid data types input!"
      }

      setTypes(data.map((n) => n as dataTypes))
    } catch (error) {
      setTypeError(error)
    }
  }

  function handleRawRecords(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLTextAreaElement
    setRawRecords(target.value)
  }

  function handleClick(e: Event) {
    try {
      if (rawRecords === undefined) {
        throw "Empty excel data field!"
      }

      if (types === undefined) {
        throw "Empty types input field!"
      }

      if (tableName === undefined || tableName === "") {
        throw "Empty table name!"
      }

      if (typeError !== "") {
        throw typeError
      }

      const rawRows = rawRecords.trim().split("\n")

      const data = rawRows.map((record) =>
        record
          .split("\t")
          .map((element, index) =>
            types[index] === dataTypes.number ? element : `"${element}"`
          )
      )

      if (data.findIndex((line) => line.length !== types.length) !== -1) {
        throw "Invalid columns data, check data types list or excel input!"
      }

      setRecords(
        data.map(
          (line) => `INSERT INTO ${tableName} VALUES (${line.join(", ")});`
        )
      )

      setTypeError("")
      setShowResults(true)
    } catch (error) {
      setShowResults(false)
      setError(error)
    }
  }

  return (
    <div className="w-full self-center">
      <div className="w-full rounded overflow-hidden shadow-lg flex flex-col gap-4 p-6 items-center justify-center">
        <h1 className="font-black text-2xl">
          Convert Excel tables to SQL INTO records
        </h1>

        <input
          type="text"
          onInput={handleTableName}
          placeholder="Table's name"
          className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />

        <textarea
          onInput={handleRawRecords}
          className="resize-y w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          placeholder="Excel Data"
          rows={8}
        ></textarea>

        <div className="flex flex-row w-full gap-4">
          <input
            type="text"
            onInput={handleTypes}
            placeholder="Data types"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />

          <input
            type="button"
            disabled={showResults}
            onClick={() => showHelp(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-green-700 "
            value="?"
          />
        </div>

        <input
          type="button"
          value={"CONVERT TO SQL RECORDS"}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleClick}
        />
      </div>

      {showResults ? (
        <div className="text-xs font-mono mt-4 w-full rounded overflow-hidden shadow-lg flex flex-col gap-4 p-6 items-center justify-center">
          {records.map((r) => (
            <span>{r}</span>
          ))}
        </div>
      ) : (
        <></>
      )}

      {help ? (
        <PopUp
          massage="Data types' field need a list of numbers, 0 for numbers and 1 for strings, for example: 1, 0, 0, 0, 1"
          visible={help}
          setVisible={showHelp}
        />
      ) : (
        <></>
      )}

      {error !== "" ? <Error message={error} setMessage={setError} /> : <></>}
    </div>
  )
}
