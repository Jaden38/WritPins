// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { addPin, getPins, deletePin } from '../pinService';
import { useAuth } from '../AuthContext';
import { trashBinOutline, add } from 'ionicons/icons';
import PinCreationForm from '../components/PinCreationForm';
import '../theme/global.css'; // Import the CSS file here

interface Pin {
  id?: string;
  title: string;
  text: string;
  userId: string;
}

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [pins, setPins] = useState<Pin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPins(user.uid);
    }
  }, [user]);

  const fetchPins = async (userId: string) => {
    const fetchedPins = await getPins(userId);
    setPins(fetchedPins);
  };

  const handleAddPin = async (title: string, text: string) => {
    if (user) {
      const newPin: Pin = { title, text, userId: user.uid };
      await addPin(newPin);
      fetchPins(user.uid);
    }
  };

  const handleDeletePin = async (pinId: string) => {
    await deletePin(pinId);
    if (user) {
      fetchPins(user.uid);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButton slot="end" onClick={handleLogout}>
            Logout
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {pins.map((pin) => (
              <IonCol size="12" size-md="6" size-lg="4" key={pin.id}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{pin.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className='pin'>
                    <div className="pin-content">
                      <p>{pin.text}</p>
                      
                    </div>
                    
                  </IonCardContent>
                  <div className="delete-button">
                        <IonButton fill="clear" onClick={() => handleDeletePin(pin.id!)}>
                          <IonIcon icon={trashBinOutline} />
                        </IonButton>
                      </div>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsModalOpen(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <PinCreationForm
          isOpen={isModalOpen}
          onAddPin={handleAddPin}
          onClose={() => setIsModalOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;