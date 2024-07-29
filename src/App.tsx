// src/App.tsx
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PinDetail from './pages/PinDetail';
import { ThemeProvider, useTheme } from './ThemeContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global CSS */
import './theme/global.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <ThemeProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <AppRoutes />
          </IonRouterOutlet>
        </IonReactRouter>
      </ThemeProvider>
    </AuthProvider>
  </IonApp>
);

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {user ? (
        <>
          <Route exact path="/home" component={Home} />
          <Route exact path="/pins/:id" component={PinDetail} />
          <Redirect from="/" to="/home" />
        </>
      ) : (
        <Redirect from="/" to="/login" />
      )}
    </Switch>
  );
};

export default App;
