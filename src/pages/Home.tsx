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
  IonFabButton,
  IonChip,
  IonMenuButton,
  IonLabel,
} from '@ionic/react';
import { addPin, getPins, deletePin } from '../pinService';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { trashBinOutline, add, filter, menu, close } from 'ionicons/icons';
import { Pin } from '../interfaces/Pin';
import PinCreationForm from '../components/PinCreationForm';
import PinSortingMenu from '../components/PinSortingMenu';
import { useHistory } from 'react-router-dom';
import '../theme/global.css'; 
import generateMorePins from '../utils/GeneratePins';
import SideMenu from '../components/SideMenu';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [pins, setPins] = useState<Pin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [isAndSearch, setIsAndSearch] = useState(true); 
  const [username, setUsername] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      fetchPins(user.uid);
      fetchUsername(user.uid);
    }
  }, [user]);

  const fetchUsername = async (userId: string) => {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      setUsername(userSnapshot.data()?.username ?? null);
    }
  };

  const fetchPins = async (userId: string) => {
    const fetchedPins = await getPins(userId);
    setPins(fetchedPins);
  };

  const handleAddPin = async (title: string, text: string, tags: string[], source: string) => {
    if (user) {
      const newPin: Pin = { title, text, userId: user.uid, tags, source, createdAt: new Date().toISOString() };
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

  const handleGenerateMorePins = async () => {
    if (user && user.uid) {
      await generateMorePins(user.uid);
      fetchPins(user.uid);
    } else {
      console.error('User is not logged in');
    }
  };

  const filteredPins = searchTags.length ? pins.filter(pin => {
    const pinTags = pin.tags.map(tag => tag.toLowerCase());
    return searchTags.every(tag => pinTags.includes(tag));
  }) : pins;

  const handleApplySort = (term: string, andSearch: boolean) => {
    setSearchTags(term.toLowerCase().split(/[ ,]+/).filter(tag => tag));
    setIsAndSearch(andSearch);
  };

  const handleTagClick = (tag: string) => {
    setSearchTags(prevTags => {
      const lowerTag = tag.toLowerCase();
      if (prevTags.includes(lowerTag)) {
        return prevTags.filter(t => t !== lowerTag);
      }
      return [...prevTags, lowerTag];
    });
  };

  const handleRemoveTag = (tag: string) => {
    setSearchTags(prevTags => prevTags.filter(t => t !== tag));
  };

  const handlePinClick = (id: string) => {
    history.push(`/pins/${id}`);
  };

  return (
    <IonPage>
      <SideMenu handleGenerateMorePins={handleGenerateMorePins} />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start">
            <IonIcon icon={menu} />
          </IonMenuButton>
          <IonTitle>My Pins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="main-content" className="ion-padding">
        {searchTags.length > 0 && (
          <div className="tag-bar">
            {searchTags.map((tag, index) => (
              <IonChip key={index}>
                <IonLabel className="tag-content">{tag}</IonLabel>
                <IonIcon icon={close} onClick={() => handleRemoveTag(tag)} />
              </IonChip>
            ))}
          </div>
        )}
        <IonGrid>
          <IonRow>
            {filteredPins.map((pin) => (
              <IonCol size="12" size-md="6" size-lg="4" key={pin.id}>
                <IonCard className="pin-card" onClick={() => handlePinClick(pin.id!)}>
                  <IonCardHeader>
                    <IonCardTitle className='pin-title'>{pin.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="pin">
                      <div className="pin-content">
                        <p>{pin.text}</p>
                        <div className='tag-list'>
                          {pin.tags.map((tag, index) => (
                            <IonChip 
                              key={index} 
                              className="ion-chip" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTagClick(tag);
                              }}
                            >
                              <IonLabel className="tag-content">{tag}</IonLabel>
                            </IonChip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </IonCardContent>
                  <div className="delete-button">
                    <IonButton fill="clear" onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePin(pin.id!);
                    }}>
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
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={() => setIsSortingModalOpen(true)}>
            <IonIcon icon={filter} />
          </IonFabButton>
        </IonFab>
        <PinCreationForm
          isOpen={isModalOpen}
          onAddPin={handleAddPin}
          onClose={() => setIsModalOpen(false)}
        />
        <PinSortingMenu
          isOpen={isSortingModalOpen}
          onClose={() => setIsSortingModalOpen(false)}
          onApplySort={handleApplySort}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
