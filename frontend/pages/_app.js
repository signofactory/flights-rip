// Global styles and reset
import "shared/styles/normalize.css";
import "shared/styles/reset.local.css";
import "shared/styles/typography.css";
import 'antd/dist/antd.css'
import "shared/styles/styles.css";

//Recoil
import {RecoilRoot} from 'recoil'

import {DataProvider} from 'shared/components/DataProvider'


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </RecoilRoot>
  )
}