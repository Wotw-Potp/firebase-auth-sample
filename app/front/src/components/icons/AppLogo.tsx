import Logo from '../../assets/react.svg'

interface Props {
  width?: number
}

const AppLogo = ({ width = 80 }: Props) => {
  return <img src={Logo} alt='React Icon' width={width} />
}

export default AppLogo
