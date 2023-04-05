import { StateUpdater } from "preact/hooks"

interface Props {
  massage: string
  visible: boolean
  setVisible: StateUpdater<boolean>
}

export default function PopUp(props: Props) {
  return (
    <div className={"absolute top-0 left-0 h-full w-full gap-6 z-30 flex items-center justify-center" + (props.visible ? "" : "hidden")}>
      <div className="bg-black absolute w-full h-full z-40 opacity-20"></div>
      <div className="flex items-center justify-center w-3/4 sm:w-1/2 bg-white rounded overflow-hidden shadow-lg flex flex-col gap-4 p-6 items-center justify-center opacity-100 z-50">
        <p class="text-center">{props.massage}</p>
        <input
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => props.setVisible(false)}
          value="Accept"
        />
      </div>
    </div>
  )
}
