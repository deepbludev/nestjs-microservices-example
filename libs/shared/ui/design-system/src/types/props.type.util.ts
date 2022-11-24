export type Props<Component> = Component extends React.ComponentType<
  infer Props
>
  ? Props extends object
    ? Props
    : never
  : never
