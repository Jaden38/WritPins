import PinListItem from '../components/PinListItem';  // Importation du composant PinListItem
import React, { useState } from 'react';  // Importation de useState et React
import { Pin, getPins, addPin } from '../data/pins';  // Importation des fonctions Pin, getPins et addPin depuis ../data/pins
import { pinSharp, searchOutline } from 'ionicons/icons';  // Importation des icônes pinSharp et searchOutline depuis ionicons/icons
import {
  IonButton,
  IonContent,
  IonMenu,
  IonIcon,
  IonRefresher,
  IonMenuToggle,
  IonRefresherContent,
  IonMenuButton,
  IonButtons,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonRippleEffect
} from '@ionic/react';  // Importation des composants Ion depuis '@ionic/react'
import './Home.css';  // Importation de la feuille de style Home.css

const Home: React.FC = () => {  // Définition du composant Home en tant que fonction React qui retourne des éléments React

  const [pins, setPins] = useState<Pin[]>([]);  // Définition de l'état des épingles et de la fonction pour les modifier
  const [searchTitle, setSearchTitle] = useState('');  // Définition de l'état du titre de recherche et de la fonction pour le modifier
  const [filteredPins, setFilteredPins] = useState<Pin[]>([]);  // Définition de l'état des épingles filtrées et de la fonction pour les modifier


  useIonViewWillEnter(() => {  // Utilisation du hook useIonViewWillEnter pour exécuter du code lorsque la vue est chargée
    const pns = getPins();  // Appel de la fonction getPins pour récupérer les épingles
    setPins(pns);  // Modification de l'état des épingles avec les épingles récupérées
  });

  const refresh = (e: CustomEvent) => {  // Définition de la fonction de rafraîchissement de la page
    setTimeout(() => {  // Utilisation de setTimeout pour simuler un chargement de 3 secondes
      e.detail.complete();  // Indication à Ionic que le rafraîchissement est terminé
    }, 3000);
  };

  const [menuType, setMenuType] = useState('overlay'); // Utilise le hook useState pour déclarer un état local "menuType" initialisé avec la chaîne "overlay"

  // Définit la fonction "handleCreatePin" pour ajouter une nouvelle épingle
  const handleCreatePin = () => {
    const titleInput = document.querySelector<HTMLInputElement>('#view-card-title input');
    const textInput = document.querySelector<HTMLInputElement>('#view-card-text input');

    if (titleInput && textInput) {
      const newPin = { // Déclare un nouvel objet "newPin" avec les données de la nouvelle épingle
        id: Date.now(),
        title: titleInput.value,
        text: textInput.value,
        author: 'John',
        source: 'My Pins',
        page_ref: 'p. 1',
        tags: ['new', 'pin'],
        preferences: 1,
        creation_date: new Date().toISOString(),
      };
      const updatedPins = [...pins, newPin];
      setPins(updatedPins);
      // Sauvegarde du tableau d'épingles mis à jour dans le stockage local
      localStorage.setItem('pins', JSON.stringify(updatedPins));

      // nettoyage des champs de saisie
      titleInput.value = '';
      textInput.value = '';
    }
  };
  const handleDeletePin = (id: number) => {
    const updatedPins = pins.filter(p => p.id !== id);
    setPins(updatedPins);
    // Sauvegarde du tableau d'épingles mis à jour dans le stockage local
    localStorage.setItem('pins', JSON.stringify(updatedPins));
  };
  const handleSearchInput = (e: any) => {
    setSearchTitle(e.target.value);
  };

  const handleSearch = () => {
    const filteredPins = pins.filter(pin => pin.title.toLowerCase().includes(searchTitle.toLowerCase()));
    setFilteredPins(filteredPins);
  };



  return (
    <>
      <IonMenu contentId="home-page">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <IonButton class="button button-block button-positive">Mes épingles</IonButton>
            <IonButton class="button button-block button-positive">Thématiques</IonButton>
            <IonButton class="button button-block button-positive">À propos</IonButton>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>
      <IonPage id="home-page">
        <IonHeader>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonIcon icon={pinSharp} />
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonHeader>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">
                Inbox
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {searchTitle === '' ?
              pins.map(p => <PinListItem key={p.id} pin={p} onDelete={handleDeletePin} />)
              :
              filteredPins.map(p => <PinListItem key={p.id} pin={p} onDelete={handleDeletePin} />)
            }
          </IonList>

        </IonContent>
        <IonCard className='ioncard'>
          <IonCardHeader>
            <IonCardTitle>Créer une nouvelle épingle</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <div id="view-card-title">
              <IonCardSubtitle>Titre : </IonCardSubtitle>
              <input type="text" required />
            </div>
            <div id="view-card-text">
              <IonCardSubtitle>Citation : </IonCardSubtitle>
              <input type="text" required />
            </div>
            <div id="search-card-title">
              <IonCardSubtitle>Rechercher par titre : </IonCardSubtitle>
              <input type="text" value={searchTitle} onInput={handleSearchInput} />
            </div>
          </IonCardContent>
          <IonButton fill="clear" onClick={handleCreatePin}>Créer</IonButton>

          <div className='wrapper-button'> <IonButton class="ion-activatable ripple-parent circle" fill="clear" onClick={handleSearch}>
            <IonIcon slot="icon-only" icon={searchOutline} />
            <IonRippleEffect></IonRippleEffect>
          </IonButton></div>


        </IonCard>


      </IonPage>
    </>
  );
}


export default Home;