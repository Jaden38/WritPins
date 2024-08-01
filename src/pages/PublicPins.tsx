// src/pages/PublicPins.tsx
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
import { getPublicPins } from '../pinService';
import { Pin } from '../interfaces/Pin';
import { useTheme } from '../ThemeContext';
import '../theme/global.css';
import SideMenu from '../components/SideMenu';
import PinSortingMenu from '../components/PinSortingMenu';
import { filter, menu, close } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const PublicPins: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const { darkMode } = useTheme();
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false);
  const [isAndSearch, setIsAndSearch] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchPins = async () => {
      const fetchedPins = await getPublicPins();
      setPins(fetchedPins);
    };
    fetchPins();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

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
    history.push(`/pins/${id}?fromPublic=true`);
  };

  return (
    <IonPage>
      <SideMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start">
            <IonIcon icon={menu} />
          </IonMenuButton>
          <IonTitle>Public Pins</IonTitle>
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
                            <IonChip key={index} className="ion-chip" onClick={(e) => { e.stopPropagation(); handleTagClick(tag); }}>
                              <IonLabel className="tag-content">{tag}</IonLabel>
                            </IonChip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={() => setIsSortingModalOpen(true)}>
            <IonIcon icon={filter} />
          </IonFabButton>
        </IonFab>
        <PinSortingMenu
          isOpen={isSortingModalOpen}
          onClose={() => setIsSortingModalOpen(false)}
          onApplySort={handleApplySort}
        />
      </IonContent>
    </IonPage>
  );
};

export default PublicPins;
