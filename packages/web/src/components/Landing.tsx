import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import useTranslation from '../hooks/useTranslation'

import {
  Container,
  AboutContainer,
  ArrowsImage,
  GoalImage,
  Page,
  Slogan,
  SubSlogan,
} from '../../styles/pages/Landing'

export const Landing = () => {
  const { t } = useTranslation()
  const presentation = t('presentation')

  return (
    <Container>
      <Head>
        <title>Brother Bet</title>
      </Head>
      <AboutContainer>
        <Page>
          <ArrowsImage />
          <Slogan>{presentation.slogan}</Slogan>
          <SubSlogan>{presentation.sub_slogan}</SubSlogan>
          <GoalImage />
        </Page>
        <Page>
          <ArrowsImage />
          <GoalImage />
        </Page>
      </AboutContainer>
    </Container>
  )
}
