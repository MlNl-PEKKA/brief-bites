import '../../styles/globals.css'

import NewsContextProvider from '@/context/newsContext'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return <NewsContextProvider><Component {...pageProps} /><Analytics /></NewsContextProvider>
}
