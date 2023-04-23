interface IconProps {
  code: string
}

export default function Footer(props: IconProps) {
  return (
    <span class="material-symbols-rounded align-top">{props.code}</span>
  )
}
