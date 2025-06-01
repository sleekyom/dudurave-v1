export interface DuduraveEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: {
    url: string;
  };
  slug: string;
}

export interface EventsResponse {
  events: DuduraveEvent[];
}

export interface EventDetailsResponse {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    price: number;
    image: {
      url: string;
    };
    slug: string;
  };
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface AboutPageContent {
  id: string;
  title: string;
  subtitle: string;
  introText: string;
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  valuesList: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface AboutPageResponse {
  aboutPages: AboutPageContent[];
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}