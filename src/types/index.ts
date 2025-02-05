export interface User {
  id: string;
  email: string;
  name: string;
  streak: number;
  points: number;
  lastDeclutterDate: Date;
}

export interface Photo {
  id: string;
  userId: string;
  url: string;
  thumbnail: string;
  category: 'document' | 'trash' | 'blurred' | 'uncategorized';
  metadata: {
    size: number;
    createdAt: Date;
    dimensions: {
      width: number;
      height: number;
    };
  };
  reviewed: boolean;
  decision?: 'keep' | 'delete';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredPoints: number;
  unlocked: boolean;
}