import styled from 'styled-components'

import logo from '../../src/assets/logo.png'
import stadium from '../../src/assets/stadium.jpg'
import arrows from '../../src/assets/arrows.png'
import data from '../../src/assets/data.png'
import player from '../../src/assets/player.png'
import goal from '../../src/assets/goal.png'
import money from '../../src/assets/money.jpg'
import playerKick from '../../src/assets/player_kick.jpg'
import { ReactComponent as Bet365White } from '../../src/assets/bet365-white.svg'
import { ReactComponent as FifaWhite } from '../../src/assets/fifa-white.svg'
import { FiChevronsDown, FiPlus } from 'react-icons/fi'

import { slideBottom } from '../animations'

export const TextGreen = styled.span`
  color: ${(props) => props.theme.colors.primary.one};
`

export const TextBlue = styled.span`
  color: ${(props) => props.theme.colors.quinary.one};
`

export const TextYellow = styled.span`
  color: ${(props) => props.theme.colors.tertiary.four};
`
export const TextPink = styled.span`
  color: ${(props) => props.theme.colors.quaternary.four};
`

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 54px;
    color: ${(props) => props.theme.colors.one};
    margin-top: 40px;
  }
  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
    color: ${(props) => props.theme.colors.one};
  }
`

export const ContainerImages = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem 0;
`

export const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 400px;
  height: 350px;
`

export const ContainerAbout = styled.div`
  background-image: url(${data});
  background-attachment: fixed;
`

export const ContainerMoney = styled.div`
  background-image: url(${money});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
`

export const ContainerCTA = styled.div`
  background-image: url(${playerKick});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
`

export const Title = styled.h2`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  text-transform: uppercase;
  font-size: 2.5rem;
  background-color: #000;
  color: white !important;
  padding: 1rem;
  position: relative;
  bottom: 3rem;
  left: 2rem;
  z-index: 4;
`

export const TitleIncrease = styled(Title)`
  font-size: 1.2rem;
`

export const TitleIncreaseSpotlight = styled.h2`
  font-size: 5rem;
  color: ${(props) => props.theme.colors.primary.two};
`

export const BoxTitleAbout = styled.div`
  background-color: ${(props) => props.theme.colors.primary.one};
  position: absolute;
  width: 5rem;
  top: -4rem;
  right: -3rem;
  height: 20rem;
  background-attachment: fixed;
  z-index: 3;
  transform-origin: top right;
`

export const BoxTitleMarket = styled.div`
  background-color: ${(props) => props.theme.colors.primary.one};
  position: relative;
  top: 1rem;
  left: 1rem;
  width: 5rem;
  height: 5rem;
  background-attachment: fixed;
  z-index: 3;
`
export const BoxTitleIncrease = styled.div`
  background-color: ${(props) => props.theme.colors.primary.one};
  position: absolute;
  width: 5rem;
  top: -4rem;
  left: 1rem;
  height: 20rem;
  background-attachment: fixed;
  z-index: 3;
  transform-origin: top right;
`

export const ContainerTitleAbout = styled.div`
  z-index: 2;
  position: relative;
  left: -2rem;
  top: 3rem;
  height: 5rem;
`

export const ContainerTitleMarket = styled.div`
  z-index: 2;
  position: relative;
  top: -0.5rem;
  left: -2rem;
  height: 7rem;
`

export const ContainerTitleIncrease = styled.div`
  z-index: 2;
  position: relative;
  right: 2rem;
  top: 2rem;
  height: 5rem;
`

export const ContainerParagraphAbout = styled.div`
  padding-right: 10rem;
  z-index: 2;
`

export const ContainerParagraphIncrease = styled.div`
  padding-top: 4rem;
  padding-left: 10rem;
  z-index: 2;
`

export const Paragraph = styled.div`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  font-size: 0.8rem;
  color: white !important;
  text-align: justify;
  padding: 0 1rem;
  z-index: 2;
  text-indent: 1rem;
`

export const Prove = styled.h3`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  text-transform: uppercase;
  z-index: 2;
  padding-bottom: 0.5rem;
`

export const Slogan = styled.h1`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-transform: uppercase;
  text-align: left;
  padding-left: 16px;
  color: white !important;
  z-index: 2;
  line-height: 3rem;
`

export const SubSlogan = styled.h4`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  width: 100%;
  font-size: 16px;
  padding-left: 16px;
  font-weight: 400;
  z-index: 2;
`

export const Video = styled.iframe`
  border: none;
  height: fit-content;
  width: 80%;
  z-index: 4;
  margin-bottom: 6rem;
  border-radius: 1rem;
  box-shadow: 0px 3px 16px ${(props) => props.theme.colors.quinary.one}, 0px -4px 10px #1c1c1e00;
`

export const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
export const CardFree = styled.div`
  border: none;
  height: 35vh;
  width: 80%;
  margin-top: 2rem;
  z-index: 4;
  border-radius: 1rem;
  opacity: 0.7;
  padding: 1rem;
  background-color: white;
`
export const CardFull = styled.div`
  border: none;
  height: 35vh;
  width: 80%;
  margin-bottom: 2rem;
  z-index: 4;
  border-radius: 1rem;
  box-shadow: 0px 3px 30px ${(props) => props.theme.colors.primary.one}, 0px -4px 10px #1c1c1e00;
  opacity: 1;
  padding: 1rem;
  background-color: white;
`

export const OverlayDark = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  opacity: 0.92;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.background.primary.four};
`

export const OverlayGrey = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  opacity: 0.85;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.background.primary.four};
`

export const OverlayLight = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  opacity: 0.25;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.primary.four};
`

export const ImageBet365White = styled(Bet365White)`
  height: auto;
  width: 5rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
`

export const ImageFifaWhite = styled(FifaWhite)`
  height: auto;
  width: 7rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
`

export const ImageSee = styled(FiChevronsDown)`
  height: 3rem;
  width: 3rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
  animation: ${slideBottom} 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite alternate-reverse
    backwards;
`

export const ImagePlus = styled(FiPlus)`
  display: inline-block;
  margin: auto;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary.two};
  position: relative;
  top: 0.5rem;
`

export const ImageArrows = styled.img.attrs({
  src: arrows,
})`
  display: flex;
  align-self: initial;
  width: 150%;
  height: 15rem;
  background-repeat: round;
  object-fit: cover;
  position: relative;
  left: -2rem;
  top: 2rem;
  margin-right: 100px;
  margin-top: 4rem;
  z-index: 2;
`

export const ImageGoal = styled.img.attrs({
  src: goal,
})`
  opacity: 0.5;
  display: flex;
  align-self: initial;
  width: 100%;
  height: auto;
  background-repeat: round;
  object-fit: cover;
  position: relative;
  bottom: 0rem;
  margin-left: 100px;
  margin-bottom: -50px;
  z-index: 2;
`

export const ImagePlayer = styled.img.attrs({
  src: player,
})`
  display: flex;
  align-self: initial;
  width: 100%;
  height: 45%;
  background-repeat: round;
  object-fit: cover;
  position: relative;
  right: -4rem;
  bottom: -1rem;
  z-index: 2;
  opacity: 0.6;
`

export const HeaderImage = styled.img.attrs({
  src: stadium,
})`
  background-image: url(${stadium});
  display: flex;
  align-self: center;
  width: 100%;
  height: 70vh;
  object-fit: cover;
  filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(60deg);
`
