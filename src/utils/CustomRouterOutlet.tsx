// src/CustomRouterOutlet.tsx
import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface CustomRouterOutletProps extends RouteComponentProps {
  children: React.ReactNode;
}

const CustomRouterOutlet: React.FC<CustomRouterOutletProps> = ({ children, ...rest }) => {
  // Filter out computedMatch prop
  const { computedMatch, ...filteredProps } = rest as any;
  return <IonRouterOutlet {...filteredProps}>{children}</IonRouterOutlet>;
};

export default withRouter(CustomRouterOutlet);
