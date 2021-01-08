import Head from 'next/head';
import Test from '../assets/betfair.svg';
import { Container } from '../../styles/pages/Home';

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <Test />
      <h1>ReactJS Structure</h1>
      <p>A ReactJS + Next.js structure made by Rockerseat.</p>
    </Container>
  );
};

export default Home;
