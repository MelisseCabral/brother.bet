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
  const context = t('about')

  return (
    <Container>
      <Head>
        <title>Brother Bet</title>
      </Head>
      <h1>{t('hello')}</h1>
      <h2>{context.paragraph.one}</h2>

      {/* <AboutContainer>
        <Page>
          <ArrowsImage />
          <Slogan>Decision based on data</Slogan>
          <SubSlogan>Your tips more acertives</SubSlogan>
        </Page>
        <Page>
          <ArrowsImage />
          <GoalImage />
        </Page>
      </AboutContainer> */}
    </Container>
  )
}
