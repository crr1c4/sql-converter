export default function Footer() {
  return (
    <div class=" p-6 text-center select-none flex items-center gap-4">
      <div>
        <span>© 2023 Copyright: </span>
        <a
          class="font-semibold hover:underline"
          href="https://github.com/crr1c4"
        >
          @crr1c4
        </a>
      </div>

      <a href="https://fresh.deno.dev">
        <img
          width="197"
          height="37"
          src="https://fresh.deno.dev/fresh-badge.svg"
          alt="Made with Fresh"
        />
      </a>
    </div>
  )
}
