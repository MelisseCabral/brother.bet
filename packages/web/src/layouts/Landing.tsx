import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import useTranslation from '../hooks/useTranslation'

import {
  Container,
  ContainerImages,
  ContainerAbout,
  ContainerMoney,
  ContainerTitleAbout,
  ContainerTitleMarket,
  ContainerTitleIncrease,
  ContainerParagraphAbout,
  ContainerParagraphIncrease,
  ImageArrows,
  ImageGoal,
  ImagePlayer,
  ImageBet365White,
  ImageFifaWhite,
  ImageSee,
  Page,
  Slogan,
  SubSlogan,
  Paragraph,
  Title,
  TitleIncrease,
  TitleIncreaseSpotlight,
  TextPink,
  TextBlue,
  TextYellow,
  TextGreen,
  Prove,
  BoxTitleMarket,
  BoxTitleAbout,
  ImagePlus,
  Video,
  BoxTitleIncrease,
  ContainerCTA,
  OverlayDark,
  OverlayGrey,
  OverlayLight,
  CardFree,
  CardFull,
} from '../../styles/pages/Landing'

import FifaWhite from '../../src/assets/fifa-white.svg'

export const Landing = () => {
  const { t } = useTranslation()
  const presentation = t('presentation')
  const about = t('about')
  const market = t('market')
  const increase = t('increase')
  const cta = t('cta')

  return (
    <Container>
      <Head>
        <title>Brother Bet</title>
      </Head>
      <ContainerAbout>
        <Page>
          <OverlayGrey />
          <ImageArrows />
          <Slogan>{presentation.slogan}</Slogan>
          <SubSlogan>
            <TextYellow>{presentation.sub_slogan}</TextYellow>
          </SubSlogan>
          <ImageGoal />
        </Page>
        <Page>
          <OverlayGrey />
          <ContainerTitleAbout>
            <BoxTitleAbout></BoxTitleAbout>
            <Title>{about.slogan}</Title>
          </ContainerTitleAbout>
          <ContainerParagraphAbout>
            <Paragraph>
              {about.paragraph.one.part.one}
              <TextGreen>{about.paragraph.one.part.two}</TextGreen>
              {about.paragraph.one.part.three}
              <TextYellow>{about.paragraph.one.part.four}</TextYellow>
              {about.paragraph.one.part.five}
            </Paragraph>
            <br />
            <Paragraph>
              {about.paragraph.two.part.one}
              <TextGreen>{about.paragraph.two.part.two}</TextGreen>
              {about.paragraph.two.part.three}
            </Paragraph>
          </ContainerParagraphAbout>

          <ImagePlayer />
        </Page>
      </ContainerAbout>
      <ContainerMoney>
        <Page>
          <OverlayDark />
          <ContainerTitleMarket>
            <BoxTitleMarket />
            <Title>{market.slogan}</Title>
          </ContainerTitleMarket>
          <Paragraph>{market.paragraph.one}</Paragraph>
          <Paragraph>{market.paragraph.two}</Paragraph>
          <Paragraph>
            <TextGreen>{market.paragraph.three}</TextGreen>
          </Paragraph>
          <Paragraph>{market.paragraph.four}</Paragraph>
          <Paragraph>
            {market.paragraph.five.part.one}
            <TextPink>{market.paragraph.five.part.two}</TextPink>
            {market.paragraph.five.part.three}
          </Paragraph>
          <ContainerImages>
            <ImageFifaWhite />
            <ImageBet365White />
          </ContainerImages>
          <Prove>
            <TextYellow>{market.paragraph.six}</TextYellow>
          </Prove>
          <Prove>
            <TextYellow>{market.paragraph.seven}</TextYellow>
          </Prove>
          <Prove>
            <TextYellow>
              <ImageSee />
            </TextYellow>
          </Prove>
        </Page>
        <Page>
          <OverlayDark />
          <ContainerTitleIncrease>
            <BoxTitleIncrease />
            <TitleIncrease>
              <div>{increase.slogan.one}</div>
              <div>
                <ImagePlus />
                {increase.slogan.two}
              </div>
              <TitleIncreaseSpotlight>{increase.slogan.three}</TitleIncreaseSpotlight>
              <div>
                {increase.slogan.four}
                <TextBlue>{increase.slogan.five}</TextBlue>
              </div>
            </TitleIncrease>
          </ContainerTitleIncrease>
          <ContainerParagraphIncrease>
            <Paragraph>{increase.paragraph.one}</Paragraph>
          </ContainerParagraphIncrease>

          <Video
            src="https://www.youtube-nocookie.com/embed/ukb4wVS4Nt8?controls=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></Video>
        </Page>
      </ContainerMoney>
      <ContainerCTA>
        <Page>
          <CardFree>
            {cta.button.one}
            {cta.button.two}
            {cta.paragraph.one}
            {cta.paragraph.two}
            {cta.paragraph.three}
            {cta.paragraph.four}
            {cta.table.one}
            {cta.table.two}
            {cta.table.three}
            {cta.table.four}
            {cta.table.five}
            {cta.table.six}
          </CardFree>
          <CardFull>
            {cta.button.one}
            {cta.button.two}
            {cta.paragraph.one}
            {cta.paragraph.two}
            {cta.paragraph.three}
            {cta.paragraph.four}
            {cta.table.one}
            {cta.table.two}
            {cta.table.three}
            {cta.table.four}
            {cta.table.five}
            {cta.table.six}
          </CardFull>

          <OverlayLight />
        </Page>
      </ContainerCTA>
    </Container>
  )
}
