import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import api from '../../../services/api'

const Comment = ({ data, type, from }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return data?.map((item) => (
    <>
      <h1>Unique Id: {item.id}</h1>
      <h1>You want the type: {type}</h1>
      <h1>You neet the dates: </h1>
      <ul>
        <li>from:{from}</li>
      </ul>
    </>
  ))
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = ['01-01-2020']

  const paths = data.map((item) => {
    return {
      params: {
        data: data,
        type: 'users',
        from: item,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { type, from } = context.params

  const year = 2020

  const { data } = await api.get(`/fifaArena?year=${year}`)

  return {
    props: {
      data: data,
      type,
      from,
    },
    revalidate: 3600,
  }
}

export default Comment
