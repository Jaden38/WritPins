// src/utils/generatePins.ts
import { Pin } from '../interfaces/Pin';
import { addPin } from '../pinService';

const generateMorePins = async (userId: string): Promise<void> => {
  const newPins: Pin[] = [
    {
      title: "La Peste",
      text: "Un roman existentialiste d'Albert Camus, décrivant une épidémie de peste dans une ville algérienne. À travers les expériences de ses personnages, Camus explore des thèmes de solidarité, d'absurdité et de lutte humaine contre des forces incontrôlables.",
      userId,
      tags: ["roman", "Camus", "existentialisme", "absurde"],
      source: "Albert Camus",
      createdAt: new Date().toISOString()
    },
    {
      title: "Cinquante nuances de Grey",
      text: "Un roman érotique qui explore les relations complexes et controversées entre Anastasia Steele et Christian Grey. Le livre a suscité un débat intense sur la représentation du consentement et des dynamiques de pouvoir dans les relations intimes.",
      userId,
      tags: ["roman", "érotique", "controversé", "consentement"],
      source: "E.L. James",
      createdAt: new Date().toISOString()
    },
    {
      title: "Sapiens",
      text: "Yuval Noah Harari retrace l'histoire de l'humanité depuis l'émergence des premiers hominidés jusqu'à nos jours. En combinant anthropologie, histoire et sociologie, Harari propose une vue d'ensemble des grands bouleversements qui ont façonné notre monde.",
      userId,
      tags: ["histoire", "anthropologie", "sociologie", "humanité"],
      source: "Yuval Noah Harari",
      createdAt: new Date().toISOString()
    },
    {
      title: "Le Seigneur des Anneaux",
      text: "Une épopée fantastique qui suit les aventures de Frodon Sacquet et de la Communauté de l'Anneau dans leur quête pour détruire l'Anneau Unique. Ce chef-d'œuvre de J.R.R. Tolkien est un monument de la littérature fantasy.",
      userId,
      tags: ["fantasy", "Tolkien", "aventure", "épique"],
      source: "J.R.R. Tolkien",
      createdAt: new Date().toISOString()
    },
    {
      title: "L'Attrape-cœurs",
      text: "Ce roman de J.D. Salinger explore les défis de l'adolescence à travers le personnage de Holden Caulfield, un jeune homme en quête de sens dans un monde qu'il trouve hypocrite et superficiel.",
      userId,
      tags: ["roman", "adolescence", "quête de sens", "Salinger"],
      source: "J.D. Salinger",
      createdAt: new Date().toISOString()
    },
    {
      title: "Le Meilleur des mondes",
      text: "Aldous Huxley décrit une société dystopique où la technologie et la manipulation génétique ont créé un monde apparemment parfait, mais profondément inhumain. Ce roman soulève des questions sur la liberté, la bonheur et l'éthique.",
      userId,
      tags: ["dystopie", "Huxley", "technologie", "éthique"],
      source: "Aldous Huxley",
      createdAt: new Date().toISOString()
    },
    {
      title: "Madame Bovary",
      text: "Gustave Flaubert raconte l'histoire tragique d'Emma Bovary, une femme insatisfaite de sa vie de province et qui cherche l'évasion dans les romans, les amours et le luxe. Ce roman est une critique acerbe de la société bourgeoise du XIXe siècle.",
      userId,
      tags: ["roman", "Flaubert", "critique sociale", "tragédie"],
      source: "Gustave Flaubert",
      createdAt: new Date().toISOString()
    },
    {
      title: "1984",
      text: "Un roman dystopique de George Orwell qui explore les thèmes de la surveillance, de la manipulation de la vérité et du totalitarisme. Le protagoniste, Winston Smith, lutte pour la vérité et la liberté dans un monde contrôlé par Big Brother.",
      userId,
      tags: ["dystopie", "Orwell", "totalitarisme", "surveillance"],
      source: "George Orwell",
      createdAt: new Date().toISOString()
    },
    {
      title: "To Kill a Mockingbird",
      text: "Harper Lee aborde les thèmes de la justice raciale et de l'innocence perdue dans le sud des États-Unis à travers les yeux de Scout Finch, une jeune fille. Ce roman est un plaidoyer poignant contre le racisme et pour l'humanité.",
      userId,
      tags: ["roman", "justice", "racisme", "innocence"],
      source: "Harper Lee",
      createdAt: new Date().toISOString()
    },
    {
      title: "Le Petit Prince",
      text: "Ce conte philosophique d'Antoine de Saint-Exupéry raconte les aventures d'un jeune prince à travers l'univers. Le livre explore des thèmes profonds comme l'amitié, l'amour, la perte et la quête de sens à travers un langage simple et poétique.",
      userId,
      tags: ["conte", "philosophie", "Saint-Exupéry", "amitié"],
      source: "Antoine de Saint-Exupéry",
      createdAt: new Date().toISOString()
    },
  ];

  for (const pin of newPins) {
    await addPin(pin);
  }
};

export default generateMorePins;
