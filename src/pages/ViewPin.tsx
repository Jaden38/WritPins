import { useState } from 'react';
import { Pin, getPin } from '../data/pins';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewPin.css';

function ViewPin() {
  const [pin, setPin] = useState<Pin>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const pns = getPin(parseInt(params.id, 10));
    setPin(pns);
  });

  return (
    <IonPage id="view-pin-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {pin ? (
          <>
            <IonItem>
              <IonIcon aria-hidden="true" icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {pin.title}
                  <span className="date">
                    <IonNote>Creation date: {pin.creation_date.toLocaleString()}</IonNote>
                  </span>
                </h2>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{pin.text}</h1>
            </div>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewPin;
