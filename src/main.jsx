import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import { Auth0Provider } from '@auth0/auth0-react'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { Provider } from 'react-redux'
import { store } from './store/store.js'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Auth0Provider
  //   domain="dev-2sup64n1d3exoseq.us.auth0.com"
  //   clientId="j8k3AGZi9CIyN5D7tUiaYyqARRnjEump"
  //   authorizationParams={{
  //     redirect_uri: window.location.origin
  //   }}
  // >
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: '#455e94',
        fontSize: '16px'
      }
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ClerkProvider>
  // </Auth0Provider>
)
