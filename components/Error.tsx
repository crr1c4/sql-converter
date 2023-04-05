import { StateUpdater } from "preact/hooks"

interface ErrorProps {
  message: string
  setMessage: StateUpdater<string>
}

export default function Error(props: ErrorProps) {
  // useEffect(() => {
  //   setTimeout(() => props.setMessage(""), 3000)
  // }, [])

  return (
    <div className="w-full absolute left-0 top-0 p-4">
      <div class="flex items-center justify-center">
        <div class=" top-0 bg-left-center p-4">
          <div
            class="relative px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <span class="absolute inset-y-0 left-0 flex items-center ml-4">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
            <p class="ml-6">
              {props.message}:{" "}
              <a
                class="font-bold hover:underline cursor-pointer"
                onClick={() => props.setMessage("")}
              >
                Ok
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
