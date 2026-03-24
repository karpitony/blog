import { ReactNode } from 'react';

export interface BoxData {
  title: string;
  programs: {
    description: string;
    year: string;
  }[];
}

export interface LinkData {
  icon: ReactNode;
  text: string;
  url: string;
}
