// src/components/PinCreationForm.tsx
import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

interface PinCreationFormProps {
  onAddPin: (title: string, text: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PinCreationForm: React.FC<PinCreationFormProps> = ({ onAddPin, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleAddPin = () => {
    onAddPin(title, text);
    setTitle('');
    setText('');
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="pin-form">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Pin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Text</IonLabel>
            <IonInput value={text} onIonChange={(e) => setText(e.detail.value!)} />
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={handleAddPin}>
          Add Pin
        </IonButton>
        <IonButton expand="full" color="light" onClick={onClose}>
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default PinCreationForm;
