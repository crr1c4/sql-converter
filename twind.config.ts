import { Options } from "$fresh/plugins/twind.ts"

export default {
  selfURL: import.meta.url,
  preflight: {
    "@import":
      `url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200')`,
  },
} as Options
