// src/components/SideMenu.tsx
import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonMenu
} from '@ionic/react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { useHistory } from 'react-router-dom';

interface SideMenuProps {
  handleGenerateMorePins?: () => Promise<void>;
}

const SideMenu: React.FC<SideMenuProps> = ({ handleGenerateMorePins }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleNavigateToPublicPins = () => {
    history.push('/public-pins');
  };

  const handleNavigateToHome = () => {
    history.push('/home');
  }

  return (
    <IonMenu contentId="main-content" side="end">
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: 'center' }}>{user?.displayName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onIonChange={toggleDarkMode} />
          </IonItem>
          <IonItem button onClick={handleNavigateToHome}>
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem button onClick={handleNavigateToPublicPins}>
            <IonLabel>Public Pins</IonLabel>
          </IonItem>
        </IonList>
        <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
          {handleGenerateMorePins && (
            <IonButton expand="full" onClick={handleGenerateMorePins} style={{ marginBottom: '10px' }}>
              Générer Pins
            </IonButton>
          )}
          <IonButton expand="full" onClick={handleLogout}>
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
