// src/components/PinSortingMenu.tsx
import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonCheckbox } from '@ionic/react';

interface PinSortingMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySort: (searchTerm: string, isAndSearch: boolean) => void;
}

const PinSortingMenu: React.FC<PinSortingMenuProps> = ({ isOpen, onClose, onApplySort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAndSearch, setIsAndSearch] = useState(false);

  const handleApplySort = () => {
    onApplySort(searchTerm, isAndSearch);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="pin-sorting-form">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sort Pins by Tags</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Search by Tags (separate with space or comma)</IonLabel>
            <IonInput
              value={searchTerm}
              onIonChange={(e) => setSearchTerm(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>AND Search</IonLabel>
            <IonCheckbox checked={isAndSearch} onIonChange={(e) => setIsAndSearch(e.detail.checked)} />
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={handleApplySort}>
          Apply
        </IonButton>
        <IonButton expand="full" color="light" onClick={onClose}>
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default PinSortingMenu;
