interface ButtonProps {
  message: string
  value: string
}

export default function Button(props: ButtonProps) {
  const runAction = () => {
    alert(props.message)
  }

  return (
    <input
      type="button"
      value={props.value}
      className="bg-green-500 text-center transition-colors duration-300 hover:bg-green-700 text-white font-bold py-2 px-2 rounded cursor-pointer disabled:bg-green-700 w-full"
      onClick={runAction}
    />
  )
}
