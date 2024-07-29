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
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonToggle,
} from '@ionic/react';
import { addPin, getPins, deletePin } from '../pinService';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { trashBinOutline, add, filter, menu, close } from 'ionicons/icons';
import PinCreationForm from '../components/PinCreationForm';
import PinSortingMenu from '../components/PinSortingMenu';
import { useHistory } from 'react-router-dom';
import '../theme/global.css'; // Import the CSS file here

interface Pin {
  id?: string;
  title: string;
  text: string;
  userId: string;
  tags: string[];
}

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [pins, setPins] = useState<Pin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false); // State for sorting modal
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [isAndSearch, setIsAndSearch] = useState(true); // Default to AND search
  const history = useHistory();

  useEffect(() => {
    if (user) {
      fetchPins(user.uid);
    }
  }, [user]);

  const fetchPins = async (userId: string) => {
    const fetchedPins = await getPins(userId);
    setPins(fetchedPins);
  };

  const handleAddPin = async (title: string, text: string, tags: string[]) => {
    if (user) {
      const newPin: Pin = { title, text, userId: user.uid, tags };
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

  // Filter pins based on AND logic
  const filteredPins = searchTags.length ? pins.filter(pin => {
    const pinTags = pin.tags.map(tag => tag.toLowerCase());
    // AND search: all searchTags must be in pinTags
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
        return prevTags.filter(t => t !== lowerTag); // Remove the tag if it already exists
      }
      return [...prevTags, lowerTag]; // Add the tag if it doesn't exist
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
      <IonMenu contentId="main-content" side="end">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Username: {user?.displayName}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle checked={darkMode} onIonChange={toggleDarkMode} />
            </IonItem>
          </IonList>
          <IonButton expand="full" onClick={handleLogout} style={{ position: 'absolute', bottom: '0', width: '100%' }}>
            Logout
          </IonButton>
        </IonContent>
      </IonMenu>
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
