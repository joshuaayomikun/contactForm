import type { AppProps /*, AppContext */ } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux'
import store from '../redux/store'
import Layout from '../components/layout';
export default ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store} >
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}