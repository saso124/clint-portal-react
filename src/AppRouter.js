import React from 'react'
import { BrowserRouter, Route,  Switch } from 'react-router-dom' //

import DashboardLayout from '_layouts/DashboardLayout'
import {AuthProvider} from '_provider/AuthProvider'
import { Auth } from './Auth'
import Dashboard from './Dashboard'
import Parks from './Parks'
import AuthGuard from 'AuthGuard'
// Use different router type depending on configuration
const AppRouterComponent = BrowserRouter

const AppRouter = () => (
  <AuthProvider>
    <AppRouterComponent>
      <Switch>
        <Route path="/auth" component={Auth} />
        <AuthGuard>
          <RouteWithLayout exact path={`/`} component={Dashboard} layout={DashboardLayout} />
          <RouteWithLayout exact path={`/parks`} component={Parks} layout={DashboardLayout} />
        </AuthGuard>
      </Switch>
    </AppRouterComponent>
  </AuthProvider>
)

const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (Layout) {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      } else {
        return <Component {...props} />
      }
    }}
  />
)

export default AppRouter
