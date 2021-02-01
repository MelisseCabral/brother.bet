import React from 'react'
import styled from 'styled-components'

import { IImageZeroRisk } from '../../src/interfaces/pages/Landing'

import logo from '../../src/assets/tiny/logo.png'
import arrows from '../../src/assets/tiny/arrows.png'
import data from '../../src/assets/tiny/data.png'
import player from '../../src/assets/tiny/player.png'
import goal from '../../src/assets/tiny/goal.png'
import money from '../../src/assets/tiny/money.jpg'
import playerKick from '../../src/assets/tiny/player_kick.jpg'
import fieldPurple from '../../src/assets/tiny/field-purple.jpg'
import zeroRisk from '../../src/assets/tiny/zero-risk.png'
import zeroRisco from '../../src/assets/tiny/zero-risco.png'

import { ReactComponent as Bet365White } from '../../src/assets/svg/bet365-white.svg'
import { ReactComponent as FifaWhite } from '../../src/assets/svg/fifa-white.svg'
import { ReactComponent as Barcode } from '../../src/assets/svg/barcode3.svg'

import { FiChevronsDown, FiPlus } from 'react-icons/fi'

import { slideBottom } from '../animations'

export const TextGreen = styled.span`
  color: ${(props) => props.theme.colors.primary.one};
`
export const TextGreenLight = styled.span`
  color: ${(props) => props.theme.colors.primary.two};
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
export const TextPurple = styled.span`
  color: ${(props) => props.theme.colors.secondary.two};
`
export const TextBlack = styled.span`
  color: ${(props) => props.theme.colors.background.primary.four};
`
export const TextGray = styled.span`
  color: ${(props) => props.theme.colors.background.secondary.two};
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
  border-radius: 0 0 2rem 2rem;
  height: calc(100vh - ${(props) => props.theme.navigation.height});
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
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
`

export const ContainerMoney = styled(ContainerAbout)`
  background-image: url(${money});
`

export const ContainerCTA = styled(ContainerAbout)`
  background-image: url(${playerKick});
`
export const ContainerBuy = styled(ContainerAbout)`
  background-image: url(${fieldPurple});
  background-size: auto fit-content;
  background-position: center;
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
  color: ${(props) => props.theme.colors.primary};
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

export const BoxTitleMarket = styled(BoxTitleAbout)`
  height: 4rem;
  left: 1rem;
`

export const BoxTitleIncrease = styled(BoxTitleAbout)`
  left: 1rem;
`

export const BoxBadge = styled.div`
  position: relative;
  width: 0;
  height: 0;
`
export const ContainerTitleAbout = styled.div`
  z-index: 2;
  position: relative;
  left: -2rem;
  height: 5rem;
  margin-top: 5rem;
`

export const ContainerTitleMarket = styled(ContainerTitleAbout)``

export const ContainerTitleIncrease = styled(ContainerTitleAbout)``

export const ContainerParagraphAbout = styled.div`
  padding-right: 10rem;
  z-index: 2;
`

export const ContainerParagraphIncrease = styled.div`
  padding-top: 4rem;
  padding-left: 10rem;
  z-index: 2;
`
export const Table = styled.table`
  border-radius: 0.7rem;
  border: 1px solid ${(props) => props.theme.colors.background.secondary.one + '80'};
  padding: 0.2rem 0.5rem;
  margin-bottom: 1rem;

  & td {
    font-size: 0.55rem;
    line-height: 0.6rem;
  }

  & tr td:nth-child(1) {
    color: ${(props) => props.theme.colors.secondary.three};
    text-align: right;
  }

  & tr td:nth-child(2) {
    color: ${(props) => props.theme.colors.background.secondary.two};
    text-align: center;
    padding: 0 0.5rem;
  }

  & tr td:nth-child(3) {
    color: ${(props) => props.theme.colors.quaternary.four};
    text-align: left;
  }
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

export const ParagraphCard = styled.h4`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  color: ${(props) => props.theme.colors.background.primary.one};
  text-align: left;
  margin-bottom: 1rem;
  width: 100%;
  font-weight: 200;
  text-align: justify;
  z-index: 2;
  font-size: 0.8em;
`

export const ParagraphCardSub = styled(ParagraphCard)`
  line-height: 2rem;
  font-size: 0.65em;
  line-height: 0.7rem;
  color: ${(props) => props.theme.colors.background.secondary.two};
  padding-left: 0.6rem;
`

export const Price = styled.div`
  font-size: 0.6rem;
  line-height: 1rem;
`

export const PriceOld = styled.span`
  font-size: 0.8rem;
  text-decoration: line-through;
  color: red;
`

export const PriceNew = styled.span`
  font-size: 1.5rem;
  line-height: 3.5rem;
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
  font-size: 12px;
  padding-left: 16px;
  font-weight: 400;
  z-index: 2;
`

export const VideoRecomendation = styled.iframe`
  border: none;
  height: fit-content;
  width: 80%;
  z-index: 4;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 3px 16px ${(props) => props.theme.colors.quinary.one}, 0px -4px 10px #1c1c1e00;
  margin: 1rem;
`
export const VideoBuy = styled(VideoRecomendation)`
  border: none;
  height: fit-content;
  width: 80%;
  z-index: 4;
  margin-bottom: 6rem;
  border-radius: 1rem;
  box-shadow: 0px 3px 16px ${(props) => props.theme.colors.tertiary.one}, 0px -4px 10px #1c1c1e00;
`

export const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - ${(props) => props.theme.navigation.height});
  overflow: hidden;
`
export const FillNavigation = styled.div`
  width: 100%;
`

export const FillNavigationContent = styled.div`
  width: 100%;
  height: calc(${(props) => props.theme.navigation.height});
  overflow: hidden;
  position: absolute;
  opacity: 0.92;
  z-index: 1;
  background-color: transparent;
`

export const CardFree = styled.div`
  border: none;
  min-height: 13rem;
  width: 80% !important;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  z-index: 4;
  border-radius: 1rem;
  padding: 0 0.5rem;
  background-color: #ffffffe6;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
export const Card = styled(CardFree)`
  min-height: 15rem;
  margin-top: 0;
  box-shadow: 0px 3px 30px ${(props) => props.theme.colors.primary.one}, 0px -4px 10px #1c1c1e00;
  background-color: white;
`

export const ButtonFree = styled.div`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
  background: ${(props) => props.theme.colors.background.secondary.one};
  height: 1.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8rem;
  z-index: 6;
  border-radius: calc(2.5rem / 2);
  box-shadow: 4px 4px 15px ${(props) => props.theme.colors.secondary.four + '26'},
    -4px -4px 15px ${(props) => props.theme.colors.primary.four + '26'};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;

  &::before {
    content: '';
    margin-bottom: 3px;
  }
`

export const ButtonFull = styled(ButtonFree)`
  background: ${(props) => props.theme.colors.primary.three};
  box-shadow: 4px 4px 15px ${(props) => props.theme.colors.secondary.four + '40'},
    -4px -4px 15px ${(props) => props.theme.colors.primary.four + '40'};
`
export const ButtonBuy = styled(ButtonFree)`
  background: ${(props) => props.theme.colors.tertiary.four};
  box-shadow: 4px 4px 15px ${(props) => props.theme.colors.tertiary.one + 'b3'},
    -4px -4px 15px ${(props) => props.theme.colors.quaternary.four + '38'};
`

export const OverlayDark = styled.div`
  width: 100%;
  height: calc(100vh - ${(props) => props.theme.navigation.height});
  overflow: hidden;
  position: absolute;
  opacity: 0.92;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.background.primary.four};
`

export const OverlayGrey = styled.div`
  width: 100%;
  height: calc(100vh - ${(props) => props.theme.navigation.height});
  overflow: hidden;
  position: absolute;
  opacity: 0.85;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.background.primary.four};
`

export const OverlayLight = styled.div`
  width: 100%;
  height: calc(100vh - ${(props) => props.theme.navigation.height});
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

export const ImageBarcode = styled(Barcode)`
  height: 3rem;
  width: auto;
  display: inline-block;
  z-index: 5;
  margin: 1rem 0;
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
export const ImagePlusParagraphFree = styled(ImagePlus)`
  font-size: 0.8rem;
  top: 0.1rem;
  margin-right: 0.5rem;
  color: ${(props) => props.theme.colors.background.primary.two};
`

export const ImagePlusParagraph = styled(ImagePlusParagraphFree)`
  color: ${(props) => props.theme.colors.primary.four};
`

export const ImagePlusParagraphSub = styled(ImagePlusParagraphFree)`
  color: ${(props) => props.theme.colors.primary.four};
  font-size: 0.6rem;
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
  justify-content: end;
  object-fit: cover;
  position: relative;
  right: -4rem;
  bottom: 0rem;
  z-index: 2;
  opacity: 0.6;
`

export const ImageZeroRisk = styled.img.attrs<IImageZeroRisk>((props) => ({
  src: props.language === 'en' ? zeroRisk : zeroRisco,
}))`
  width: 5rem;
  height: auto;
  background-repeat: no-repeat;
  object-fit: cover;
  z-index: 4;
  position: absolute;
  left: 25vw;
  bottom: 1.5rem;
  transform: rotate(20deg);
` as React.FC<IImageZeroRisk>
