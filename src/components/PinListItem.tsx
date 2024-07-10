import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote, 
  IonChip,
  IonButton
} from '@ionic/react';
import { Pin } from '../data/pins'; // Importe le type Pin depuis le fichier pins.ts
import './PinListItem.css';

interface PinListItemProps {
  pin: Pin; // Propriété qui reçoit l'objet Pin à afficher
  onDelete: (id: number) => void; // Fonction qui sera appelée lorsqu'on supprime un Pin
}

// Définition du composant PinListItem avec React.FC (Functional Component)
const PinListItem: React.FC<PinListItemProps> = ({ pin, onDelete }) => {
  // Fonction qui gère la suppression d'un Pin
  const handleDelete = (event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>, id: number) => {
    event.preventDefault(); // Empêche le comportement par défaut du bouton (soumission d'un formulaire, etc.)
    onDelete(id); // Appelle la fonction onDelete passée en prop avec l'id du Pin à supprimer
  };
  
  // Rendu du composant
  return (
    <IonItem routerLink={`/pin/${pin.id}`} detail={false} onClick={(e) => e.stopPropagation()}>
      {/* Élément dot pour afficher une icône */}
      <div slot="start" className="dot dot-unread"></div>
      {/* Élément label qui contient le titre, les tags et le texte du Pin */}
      <IonLabel className="ion-text-wrap">
        <div className="message-header">
          <h1>{pin.title}</h1>
          {/* Liste des tags du Pin */}
          <div className="chip-container">
            {pin.tags.map((tag, index) => (
              <IonChip key={index} outline={true}>
                #{tag}
              </IonChip>
            ))}
          </div>
        </div>
        <IonNote>{pin.text}</IonNote>
      </IonLabel>
      {/* Bouton de suppression */}
      <IonButton slot="end" color="danger" onClick={(event) => handleDelete(event, pin.id)}>Delete</IonButton>
    </IonItem>
  );
};

// Exporte le composant PinListItem pour qu'il puisse être utilisé ailleurs dans l'application
export default PinListItem;
