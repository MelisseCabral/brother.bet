import styled from 'styled-components'

import logo from '../../src/assets/logo.png'
import stadium from '../../src/assets/stadium.jpg'
import arrows from '../../src/assets/arrows.png'
import data from '../../src/assets/data.png'
import field from '../../src/assets/field.png'
import goal from '../../src/assets/goal.png'

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

export const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 400px;
  height: 350px;
`

export const AboutContainer = styled.div`
  background-image: url(${data});
  background-attachment: fixed;
`

export const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background-color: ${(props) => props.theme.colors.background.primary.four};
    background-attachment: fixed;

    opacity: 0.7;
    z-index: 1;
  }
`

export const ArrowsImage = styled.img.attrs({
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

export const GoalImage = styled.img.attrs({
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
  color: ${(props) => props.theme.colors.tertiary.four};
  z-index: 2;
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
