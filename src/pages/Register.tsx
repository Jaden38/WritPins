// src/pages/Register.tsx
import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonText, IonTitle, IonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import '../theme/global.css';


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const { register } = useAuth();
  const history = useHistory();

  const handleRegister = async () => {
    try {
      await register(email ?? '', password ?? '', username ?? '');
      history.push('/home');
    } catch (error) {
      console.error('Registration failed', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setToastMessage('The email address is already in use by another account.');
            break;
          case 'auth/invalid-email':
            setToastMessage('The email address is not valid.');
            break;
          case 'auth/weak-password':
            setToastMessage('The password is too weak.');
            break;
          default:
            setToastMessage('Registration failed. Please check your details and try again.');
            break;
        }
      } else {
        setToastMessage('Registration failed. Please check your details and try again.');
      }
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonTitle className="auth-title">Create Your WritPins Account</IonTitle>
        <div className="auth-form">
          <IonInput
            className='auth-input'
            placeholder="Username"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value ?? '')}
          />
          <IonInput
            className='auth-input'
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value ?? '')}
          />
          <IonInput
            className='auth-input'
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value ?? '')}
          />
          <IonButton expand="full" onClick={handleRegister}>
            Register
          </IonButton>
          <IonText>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </IonText>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
