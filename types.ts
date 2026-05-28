export type Tab = 'home' | 'about' | 'hobbies' | 'contact';

export interface HobbyItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  buttonText?: string;
  buttonLink?: string;
}

export interface VisionCard {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface ProfileCard {
  name: string;
  role: string;
  ageText: string;
  description: string;
  tags: string[];
  avatar: string;
  bgColor: string;
  accentColor: string;
}
