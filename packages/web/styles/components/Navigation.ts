import React from 'react'
import styled, { css } from 'styled-components'

import { IButton } from '../../src/interfaces/components/Navigation'

import { ReactComponent as Tab } from '../../src/assets/svg/intersect.svg'

import { FiHome, FiUsers, FiUser, FiLock, FiShield } from 'react-icons/fi'

import { liquid } from '../animations'

export const ContainerTab = styled.span`
  z-index: 99;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
`

export const TabBar = styled(Tab)`
  width: 100%;
`

export const ContainerButtons = styled.span`
  position: relative;
  height: 0;
  width: 0;
`
export const ContainerVirtualButtons = styled.span`
  position: absolute;
  height: fit-content;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 1rem;
  color: ${(props) => props.theme.colors.background.secondary.two} !important;
`

export const Button = styled.span<IButton>`
  height: 3rem;
  width: 3rem;
  z-index: 2;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  position: relative;
  top: ${(props) => (props.animate ? ' -2.5rem' : '')};
  color: ${(props) => (props.animate ? 'white' : '')};

  box-shadow: ${(props) =>
    props.animate
      ? css`
          4px 4px 10px ${(props) => props.theme.colors.secondary.three + '33'},
          -4px -4px 10px ${(props) => props.theme.colors.primary.one + '66'};
        `
      : ''};
  background: ${(props) =>
    props.animate
      ? css`
          linear-gradient(00deg, #50fa7b 0%, #00d58f 100%);
        `
      : ''};
  transform: rotate(-135deg);
  /* transition: all ease 0.5s; */

  animation: ${(props) =>
    props.animate
      ? css`
          ${liquid('-2.5rem')} ease-in-out 1s
        `
      : ''};
` as React.FC<IButton>

export const IconHome = styled(FiHome)`
  height: auto;
  width: 1rem;
  z-index: 2;
  margin: auto;
  transform: rotate(-225deg);
`

export const IconUsers = styled(FiUser)`
  height: auto;
  width: 1rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
  transform: rotate(-225deg);
`
export const IconTeam = styled(FiUsers)`
  height: auto;
  width: 1rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
  transform: rotate(-225deg);
`

export const IconVip = styled(FiLock)`
  height: auto;
  width: 1rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
  transform: rotate(-225deg);
`

export const IconSign = styled(FiShield)`
  height: auto;
  width: 1rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
  transform: rotate(-225deg);
`
