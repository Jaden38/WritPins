import MessageListItem from '../components/MessageListItem';
import React, { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import { pinSharp } from 'ionicons/icons';
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonMenu,
  IonIcon,
  IonRefresher,
  IonMenuToggle,
  IonRadio,
  RadioGroupCustomEvent,
  IonRefresherContent,
  IonMenuButton,
  IonButtons,
  IonRadioGroup,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const [menuType, setMenuType] = useState('overlay');

  return (
    <>
      <IonMenu contentId="home-page">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <IonButton>Click to close the menu</IonButton>
            <IonButton>Mes épingles</IonButton>
            <IonButton>Thématiques</IonButton>
            <IonButton>À propos</IonButton>
          </IonMenuToggle>  
        </IonContent>
      </IonMenu>
      <IonPage id="home-page">
      <IonHeader>
      <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonIcon icon={pinSharp} />
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {messages.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
    </>
  );
}


export default Home;