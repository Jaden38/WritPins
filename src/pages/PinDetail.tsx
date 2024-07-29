// src/pages/PinDetail.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonChip, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { getPin } from '../pinService';
import { Pin } from '../interfaces/Pin'; // Ensure this path is correct

const PinDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const pinId = match.params.id;
  const [pin, setPin] = useState<Pin | null>(null);

  useEffect(() => {
    const fetchPin = async () => {
      const fetchedPin = await getPin(pinId);
      setPin(fetchedPin);
    };
    fetchPin();
  }, [pinId]);

  if (!pin) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{pin.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{pin.title}</h2>
        <p>{pin.text}</p>
        <div>
          {pin.tags.map((tag, index) => (
            <IonChip key={index}>
              <IonLabel>{tag}</IonLabel>
            </IonChip>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PinDetail;
