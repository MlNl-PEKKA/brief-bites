import '@/styles/globals.css'

import NewsContextProvider from '@/context/newsContext'

export default function App({ Component, pageProps }) {
  return <NewsContextProvider><Component {...pageProps} /></NewsContextProvider>
}
