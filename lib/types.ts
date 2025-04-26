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

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}