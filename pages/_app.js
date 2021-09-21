import 'fontsource-roboto'
import '../styles/globals.css'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Default from '../layouts/Default'
import Head from 'next/head'
import Header from '../components/Header'
import { Hydrate } from 'react-query/hydration'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import queryClient from '../utils/queryClient'
import { QueryClientProvider } from "react-query"
import { useIsFetching } from 'react-query'
import { useSessionConditionRedirect } from '../hooks/useSessionConditionRedirect'

const Content = ({ Component, pageProps }) => {
  const isFetching = useIsFetching()
  return ( 
    <>
      <Header />
      <Container maxWidth='md'>
        <Box pt={15} pb={12} height='100vh' display='flex' flexDirection='column' alignItems='center'>
          {isFetching?<CircularProgress />:null}
          <br/>
          <Component {...pageProps} />
        </Box>
      </Container>
    </>
  )
}

function MyApp({ Component, pageProps }) {

  const Layout = Component.layout || Default

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Layout >
              <Content {...{Component, pageProps}}/>
            </Layout>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </div>
  )
}

MyApp.getInitialProps = async ctx => useSessionConditionRedirect(ctx)

export default MyApp
