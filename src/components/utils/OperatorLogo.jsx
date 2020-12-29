import React from 'react';
import { Icon, Image, Label } from 'semantic-ui-react';
import {
  dnaLogo as dnaLogoSmall,
  elisaLogo as elisaLogoSmall,
  teliaLogo as teliaLogoSmall,
  teliaLogoMed,
  elisaLogoMed,
  dnaLogoMed,
} from '../../media/logos/index';

export const OperatorLogo = ({ operator, size }) => {
  switch (operator) {
    case 'Dna':
      return (
        <Image
          src={size === 'medium' ? dnaLogoMed : dnaLogoSmall}
          alt="DNA"
          wrapped
        />
      );
    case 'Telia':
      return (
        <Image
          src={size === 'medium' ? teliaLogoMed : teliaLogoSmall}
          alt="Telia"
          wrapped
        />
      );
    case 'Elisa':
      return (
        <Image
          src={size === 'medium' ? elisaLogoMed : elisaLogoSmall}
          alt="Elisa"
          wrapped
        />
      );
      case 'muu':
        return (          
          <Label> <Icon
            name='shield'
            size='huge'
            alt="Muu"          
          /> Muu
          </Label>
        );
    default:
      return null;
  }
};
