import { useState } from "preact/hooks"

export default function Converter() {
  const [tableName, setTableName] = useState("")
  const [records, setRecords] = useState("")
  const [dataTypes, setDataTypes] = useState("")
  const [results, setResults] = useState([""])
  const [showResults, setShowResults] = useState(false)

  function handleTableName(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    setTableName(target.value)
  }

  function handleDataTypes(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    setDataTypes(target.value)
  }

  function handleRecords(e: Event) {
    e.preventDefault()
    const target = e.target as HTMLTextAreaElement
    setRecords(target.value)
  }

  function handleClick(e: Event) {
    e.preventDefault()
    const processedDataTypes = dataTypes
      .trim()
      .split(",")
      .map((n) => Number(n))

    if (dataTypes.trim().split(",")[processedDataTypes.length - 1] === "") {
      location.href = "/error"
      return
    }
    if (tableName === "") {
      location.href = "/error"
      return
    }

    processedDataTypes.forEach((n) => {
      if ((n !== 0 && n !== 1) || isNaN(n)) {
        location.href = "/error"
        return
      }
    })

    const processedRecords = records
      .split("\n")
      .map((record) =>
        record
          .split("\t")
          .map((element, index) =>
            processedDataTypes[index] === 1 ? element : `"${element}"`
          )
      )

    if (processedRecords[0].length !== processedDataTypes.length) {
      location.href = "/error"
      return
    }

    const result = processedRecords.map(
      (line) => `INSERT INTO ${tableName} VALUES (${line.join(", ")});`
    )

    setResults(result)
    setShowResults(true)
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
          value={tableName}
          placeholder="Table's name"
          className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />

        <textarea
          onInput={handleRecords}
          className="resize-y w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          placeholder="Excel Data"
          rows={8}
        ></textarea>

        <input
          type="text"
          onInput={handleDataTypes}
          value={dataTypes}
          placeholder="Data types (use 1 for numbers and 0 for string, divided by commas, for example: 1, 0, 1, 0, 1)"
          className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />

        <input
          type="button"
          value={"CONVERT TO SQL"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        />
      </div>

      {showResults === true ? (
        <div className="w-full rounded overflow-hidden shadow-lg flex flex-col gap-4 p-2 items-center justify-center">
          <h1 className="font-black text-2xl">Results</h1>
          {results.map((r) => (
            <p className="text-xs font-mono">{r}</p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
