export interface Pin {
    id: number;
    title: string;
    text: string;
    author: string;
    source: string;
    page_ref: string;
    tags: string[];
    preferences: number ;
    creation_date: string;
}
// Retrieve the pins from local storage or initialize with default values
const pinsFromStorage = JSON.parse(localStorage.getItem('pins') || '[]');
const pin: Pin[] = pinsFromStorage.length ? pinsFromStorage : [
    {
      id: 0,
      title: 'Curious Cat',
      text: 'A cat with a question.',
      author: 'Alice',
      source: 'Book of Cats',
      page_ref: 'p. 12',
      tags: ['cat', 'curiosity'],
      preferences: 3,
      creation_date: '10/15/2021',
    },
    {
      id: 1,
      title: 'Jolly Giraffe',
      text: 'A giraffe that loves to laugh.',
      author: 'Bob',
      source: 'Giraffe Journal',
      page_ref: 'p. 32',
      tags: ['giraffe', 'laughter'],
      preferences: 1,
      creation_date: '06/11/2020',
    },
    {
      id: 2,
      title: 'Playful Panda',
      text: 'A panda that enjoys playing.',
      author: 'Carol',
      source: 'Panda Weekly',
      page_ref: 'p. 7',
      tags: ['panda', 'play'],
      preferences: 1,
      creation_date: '02/28/2021',
    },
    {
      id: 3,
      title: 'Sleepy Sloth',
      text: 'A sloth that loves to sleep.',
      author: 'David',
      source: 'Sloth Daily',
      page_ref: 'p. 20',
      tags: ['sloth', 'sleep'],
      preferences: 2,
      creation_date: '12/21/2020',
    },
    {
      id: 4,
      title: 'Brave Bear',
      text: 'A bear with a brave spirit.',
      author: 'Eva',
      source: 'Bear Monthly',
      page_ref: 'p. 45',
      tags: ['bear', 'bravery'],
      preferences: 1,
      creation_date: '07/05/2019',
    },
    {
      id: 5,
      title: 'Cunning Fox',
      text: 'A fox with a cunning mind.',
      author: 'Frank',
      source: 'Fox Times',
      page_ref: 'p. 5',
      tags: ['fox', 'cunning'],
      preferences: 2,
      creation_date: '03/10/2021',
    },
    {
      id: 6,
      title: 'Wise Owl',
      text: 'An owl with a wealth of wisdom.',
      author: 'Grace',
      source: 'Owl Chronicles',
      page_ref: 'p. 17',
      tags: ['owl', 'wisdom'],
      preferences: 2,
      creation_date: '09/14/2018',
    },
    {
      id: 7,
      title: 'Determined Dog',
      text: 'A dog with a determined spirit.',
      author: 'Henry',
      source: 'Dog Diaries',
      page_ref: 'p. 25',
      tags: ['dog', 'determination'],
      preferences: 3,
      creation_date: '08/22/2021',
    }
  ];


export const getPins = () => pin;
export const getPin = (id: number) => pin.find(p => p.id === id);
export const addPin = (newPin: Pin) => {
  pin.push(newPin);
};

