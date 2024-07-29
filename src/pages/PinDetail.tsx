// src/pages/PinDetail.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonChip, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { getPin } from '../pinService';
import { Pin } from '../interfaces/Pin'; 
import { useTheme } from '../ThemeContext';

const PinDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const pinId = match.params.id;
  const [pin, setPin] = useState<Pin | null>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchPin = async () => {
      const fetchedPin = await getPin(pinId);
      setPin(fetchedPin);
    };
    fetchPin();
  }, [pinId]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

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
          <IonTitle size='large'>{pin.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>{pin.text}</p>
        <p><strong>Source:</strong> {pin.source}</p>
        <p><strong>Created At:</strong> {new Date(pin.createdAt).toLocaleString()}</p>
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
