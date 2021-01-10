import Head from 'next/head'
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
        <title>Homepage</title>
      </Head>

      <HeaderContainer>
        <HeaderImage />

        <HeaderContainerTitle>
          <HeaderTitle>Brother Bet</HeaderTitle>
          <HeaderSubtitle>Potencialize seus resultados já!</HeaderSubtitle>
        </HeaderContainerTitle>

        <FeaturesListContainer>
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
