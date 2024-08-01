// src/components/PinCreationForm.tsx
import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonChip, IonIcon, IonCheckbox } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';

interface PinCreationFormProps {
  onAddPin: (title: string, text: string, tags: string[], source: string, isPublic: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PinCreationForm: React.FC<PinCreationFormProps> = ({ onAddPin, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [source, setSource] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleAddPin = () => {
    onAddPin(title, text, tags, source, isPublic);
    setTitle('');
    setText('');
    setTags([]);
    setTagInput('');
    setSource('');
    setIsPublic(false);
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="pin-form">
      <IonHeader>
        <IonToolbar>
          <IonTitle className='pin-main-title'>Create Pin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel className='pin-title-form' position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel className='pin-text-form' position="stacked">Text</IonLabel>
            <IonInput value={text} onIonChange={(e) => setText(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel className='pin-tags-form' position="stacked">Tags</IonLabel>
            <IonInput
              value={tagInput}
              onIonChange={(e) => setTagInput(e.detail.value!)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <IonButton slot="end" onClick={handleAddTag}>Add Tag</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel className='pin-source-form' position="stacked">Source</IonLabel>
            <IonInput value={source} onIonChange={(e) => setSource(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel>Public</IonLabel>
            <IonCheckbox checked={isPublic} onIonChange={(e) => setIsPublic(e.detail.checked)} />
          </IonItem>
          <IonItem>
            {tags.map((tag, index) => (
              <IonChip key={index} onClick={() => handleRemoveTag(tag)}>
                {tag}
                <IonIcon icon={closeCircleOutline} />
              </IonChip>
            ))}
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
