import { useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonButton,
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
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
  if(isLoggedIn) {
    return <Redirect to="/home"/>}
  
  return (
    <IonPage id="page">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonCard id="card">
          <IonCardHeader>
            <IonCardTitle id="title">Connexion</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput id="input" placeholder="Username"></IonInput>
            <IonInput id="input" placeholder="Password"></IonInput>
          </IonCardContent>

          <IonButton onClick={() => setIsLoggedIn(true)}>Login</IonButton>

        </IonCard>
      </IonContent>
    </IonPage>

  );
};

export default App;