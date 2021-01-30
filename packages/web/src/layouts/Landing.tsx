import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { Player } from '@lottiefiles/react-lottie-player'

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
  ParagraphCTA,
  ImageBarcode,
  ButtonFree,
  ButtonFull,
  TextBlack,
  ImagePlusFree,
  ImagePlusFull,
  Table,
} from '../../styles/pages/Landing'

import barcode from '../../src/assets/animations/barcode.json'
import gift from '../../src/assets/animations/gift.json'
import love from '../../src/assets/animations/love.json'
import rocket from '../../src/assets/animations/rocket.json'

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
            <ImageBarcode />
            <ParagraphCTA>
              <ImagePlusFree />
              {cta.paragraph.one}
            </ParagraphCTA>
            <ParagraphCTA>
              <ImagePlusFree />
              {cta.paragraph.two}
            </ParagraphCTA>
            <ButtonFree>{cta.button.one}</ButtonFree>
          </CardFree>
          <CardFull>
            {/* <Player autoplay loop src={love} style={{ height: '3rem', width: '3rem' }} /> */}
            {/* <Player autoplay loop src={gift} style={{ height: '15rem', width: '15rem' }} /> */}
            <Player autoplay loop src={rocket} style={{ height: '5rem', width: '5rem' }} />
            <ParagraphCTA>
              <ImagePlusFull />
              {cta.paragraph.three}
            </ParagraphCTA>
            <Table>
              <tr>
                <td>{cta.table.one}</td>
                <td>vs</td>
                <td> {cta.table.two}</td>
              </tr>
              <tr>
                <td>{cta.table.three}</td>
                <td>vs</td>
                <td> {cta.table.four}</td>
              </tr>
              <tr>
                <td>{cta.table.five}</td>
                <td>vs</td>
                <td> {cta.table.six}</td>
              </tr>
            </Table>
            <ParagraphCTA>
              <ImagePlusFull />
              {cta.paragraph.four}
            </ParagraphCTA>

            <ButtonFull>{cta.button.two}</ButtonFull>
          </CardFull>
          <OverlayLight />
        </Page>
      </ContainerCTA>
    </Container>
  )
}
