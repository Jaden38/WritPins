// src/pages/Login.tsx
import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonText, IonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const { login, googleSignIn } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login(identifier ?? '', password ?? '');
      history.push('/home');
    } catch (error) {
      console.error('Login failed', error);
      setToastMessage('Login failed. Please check your credentials and try again.');
      setShowToast(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      history.push('/home');
    } catch (error) {
      console.error('Google Sign-In failed', error);
      setToastMessage('Google Sign-In failed. Please try again.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Email or Username"
          value={identifier}
          onIonChange={(e) => setIdentifier(e.detail.value ?? '')}
        />
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value ?? '')}
        />
        <IonButton expand="full" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand="full" color="secondary" onClick={handleGoogleSignIn}>
          Sign in with Google
        </IonButton>
        <IonText>
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </IonText>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
