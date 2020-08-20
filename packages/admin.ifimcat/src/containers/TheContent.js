import React, { Suspense } from 'react'
import {
  Redirect,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import AuthRoute from '../components/AuthRoute'
import routes from '../routes'
import { useQuery } from '@apollo/react-hooks';
import { Q_CURRENT_USER } from '../queries';
import { AuthContext } from '../conext/Auth.context';

const fallbackLoading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
  const { loading, data } = useQuery(Q_CURRENT_USER, {
    fetchPolicy: "network-only",
    onError(err) {
      console.log(err);
      props.history.push('/500');
    }
  });

  if (loading) {
    return fallbackLoading;
  }
  return (
    <AuthContext.Provider value={{...data}}>
      <main className="c-main">
        <CContainer fluid>
          <Suspense fallback={fallbackLoading}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component && (
                  <AuthRoute
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>
    </AuthContext.Provider>
  )
};

export default React.memo(TheContent);
