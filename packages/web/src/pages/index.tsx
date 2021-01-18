import Link from 'next/link'
import Head from 'next/head'

import React from 'react'
import {
  Container,
  HeaderContainer,
  HeaderImage,
  HeaderTitle,
  HeaderSubtitle,
  HeaderContainerTitle,
  FeaturesListContainer,
  FeaturesListItem,
} from '../../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Brother Bet</title>
      </Head>

      <HeaderContainer>
        <HeaderImage />

        <HeaderContainerTitle>
          <HeaderTitle>Brother Bet</HeaderTitle>
          <HeaderSubtitle>Potencialize seus resultados já!</HeaderSubtitle>
        </HeaderContainerTitle>

        <FeaturesListContainer>
          <Link href="/rank/[type]/[from]" as={`/rank/${'users'}/${'01-01-2020'}`}>
            <FeaturesListItem>Rank Users</FeaturesListItem>
          </Link>
          <FeaturesListItem>Estatísticas</FeaturesListItem>
          <FeaturesListItem>Previsões</FeaturesListItem>
          <FeaturesListItem>Gestor de resultados</FeaturesListItem>
          <FeaturesListItem>Inteligência Artificial</FeaturesListItem>
        </FeaturesListContainer>
      </HeaderContainer>
    </Container>
  )
}

export default Home
