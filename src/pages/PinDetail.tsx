// src/pages/PinDetail.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonChip, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { getPin, updatePin } from '../services/pinService'; // Make sure to import updatePin
import { Pin } from '../interfaces/Pin'; 
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import '../theme/global.css';

const PinDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match, location }) => {
  const pinId = match.params.id;
  const [pin, setPin] = useState<Pin | null>(null);
  const { darkMode } = useTheme();
  const { user } = useAuth(); // Use the useAuth hook to get the current user

  const isFromPublic = new URLSearchParams(location.search).get('fromPublic') === 'true';

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

  const handleMakePublic = async () => {
    if (pin) {
      const updatedPin = { ...pin, public: true };
      await updatePin(updatedPin); // Update the pin to be public
      setPin(updatedPin); // Update the state
    }
  };

  const handleMakePrivate = async () => {
    if (pin) {
      const updatedPin = { ...pin, public: false };
      await updatePin(updatedPin); // Update the pin to be private
      setPin(updatedPin); // Update the state
    }
  };

  if (!pin) {
    return <div className="loading-container">
                <div className="lds-dual-ring"></div>
            </div>;
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
        <span className="date-created">Created at : {new Date(pin.createdAt).toLocaleString()}</span>
        <p>{pin.text}</p>
        <p><strong>Source:</strong> {pin.source}</p>
        <div>
          {pin.tags.map((tag, index) => (
            <IonChip key={index}>
              <IonLabel>{tag}</IonLabel>
            </IonChip>
          ))}
        </div>
        {isFromPublic ? (
          <IonButton disabled>Public</IonButton>
        ) : (
          pin.userId === user?.uid && (
            pin.public ? 
            <IonButton onClick={handleMakePrivate}>Make Private</IonButton> : 
            <IonButton onClick={handleMakePublic}>Make Public</IonButton>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default PinDetail;
