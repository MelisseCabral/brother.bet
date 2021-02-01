import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getLocalizationProps, LanguageProvider } from '../../context/LanguageContext'
import { Localization } from '../../translations/types'
import { Landing } from '../../layouts/pages/Landing'
import { Navigation } from '../../layouts/components//Navigation'

const IndexPage: NextPage<{
  localization: Localization
}> = ({ localization }) => (
  <LanguageProvider localization={localization}>
    <Landing />
    <Navigation />
  </LanguageProvider>
)

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, 'landing')
  return {
    props: {
      localization,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'pt'].map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}

export default IndexPage
