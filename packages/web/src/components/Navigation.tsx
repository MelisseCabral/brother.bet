import React, { useState, useEffect } from 'react'

import { IButtonsAnimate } from '../../src/interfaces'

import {
  Button,
  IconHome,
  IconUsers,
  IconTeam,
  ContainerTab,
  TabBar,
  ContainerButtons,
  ContainerVirtualButtons,
  IconVip,
  IconSign,
} from '../../styles/components/Navigation'

export const Navigation = () => {
  const [animate, setAnimate] = useState<IButtonsAnimate>({
    vip: false,
    team: false,
    home: false,
    users: false,
    sign: false,
  })

  useEffect(() => {
    console.log(animate)
  }, [animate])

  return (
    <>
      <ContainerTab>
        <ContainerButtons>
          <ContainerVirtualButtons>
            <IconVip />
            <IconTeam />
            <Button
              animate={animate.home}
              onClick={() => {
                setAnimate((state) => ({ ...state, home: true }))
                setTimeout(() => {
                  setAnimate((state) => ({ ...state, home: false }))
                }, 1000)
              }}
            >
              <IconHome />
            </Button>
            <IconUsers />
            <IconSign />
          </ContainerVirtualButtons>
        </ContainerButtons>
        <TabBar />
      </ContainerTab>
    </>
  )
}
