import React from 'react';
import { Image } from 'semantic-ui-react';
import { dnaLogo, elisaLogo, teliaLogo } from '../../media/logos/index';

export const OperatorLogo = ({ operator }) => {
  
  switch (operator) {
    case 'Dna':
      return <Image src={dnaLogo} alt="DNA"  />;
    case 'Telia':
      return <Image src={teliaLogo} alt="Telia" />;
    case 'Elisa':
      return <Image src={elisaLogo} alt="Elisa" />;
    default:
      return null;
  }
};
