export interface IButtonsAnimate {
  vip: boolean
  team: boolean
  home: boolean
  users: boolean
  sign: boolean
}

export interface IButton {
  onClick: () => void
  animate: boolean
}
