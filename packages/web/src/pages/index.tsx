import Head from 'next/head'
import { Container, Logo } from '../../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <Logo />
      <h1>ReactJS Structure</h1>
      <p>A ReactJS + Next.js structure made by Brother Bet.</p>
    </Container>
  )
}

export default Home
