import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonInput
} from '@ionic/react';
import './Login.css';
import { Redirect } from 'react-router';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <IonPage id="page">
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle className="header-title">WritePins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonCard id="card">
          <IonCardHeader>
            <IonCardTitle id="title">Connexion</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput id="input" placeholder="Identifiant"></IonInput>
            <IonInput id="input" placeholder="Mot de passe" type="password"></IonInput>
          </IonCardContent>
          <IonButton onClick={() => setIsLoggedIn(true)}>Login</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default App;
