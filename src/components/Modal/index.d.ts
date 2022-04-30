interface Props {
  /** show value */
  visible: boolean
  /** show func */
  setVisible: Function
  /** JSX */
  children: React.ReactElement
}

export const Modal: React.FunctionComponent<Props>
