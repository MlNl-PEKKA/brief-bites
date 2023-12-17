import '../../styles/globals.css'

import NewsContextProvider from '@/context/newsContext'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }) {
  return <NewsContextProvider><Component {...pageProps} /><Analytics /><SpeedInsights/></NewsContextProvider>
}
