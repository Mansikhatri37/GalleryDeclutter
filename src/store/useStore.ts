import { create } from 'zustand';
import { Photo, User, Achievement } from '../types';

interface Store {
  user: User | null;
  photos: Photo[];
  dailyPhotos: Photo[];
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setPhotos: (photos: Photo[]) => void;
  setDailyPhotos: (photos: Photo[]) => void;
  updatePhotoDecision: (photoId: string, decision: 'keep' | 'delete') => void;
  setAchievements: (achievements: Achievement[]) => void;
  addPhotos: (files: File[]) => void;
  getNewDailyPhotos: () => void;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  photos: [],
  dailyPhotos: [],
  achievements: [],
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setPhotos: (photos) => set({ photos }),
  setDailyPhotos: (photos) => set({ dailyPhotos }),
  updatePhotoDecision: (photoId, decision) =>
    set((state) => ({
      photos: state.photos.map((photo) =>
        photo.id === photoId ? { ...photo, decision, reviewed: true } : photo
      ),
      dailyPhotos: state.dailyPhotos.map((photo) =>
        photo.id === photoId ? { ...photo, decision, reviewed: true } : photo
      ),
    })),
  setAchievements: (achievements) => set({ achievements }),
  addPhotos: async (files) => {
    const newPhotos: Photo[] = await Promise.all(
      files.map(async (file) => {
        const url = URL.createObjectURL(file);
        return {
          id: Math.random().toString(36).substring(7),
          userId: get().user?.id || 'guest',
          url,
          thumbnail: url,
          category: 'uncategorized',
          metadata: {
            size: file.size,
            createdAt: new Date(),
            dimensions: {
              width: 0,
              height: 0,
            },
          },
          reviewed: false,
          decision: undefined,
        };
      })
    );

    set((state) => ({
      photos: [...state.photos, ...newPhotos],
    }));

    // After adding new photos, get new daily photos
    get().getNewDailyPhotos();
  },
  getNewDailyPhotos: () => {
    const { photos } = get();
    // Get only unreviewed photos
    const unreviewedPhotos = photos.filter(photo => !photo.reviewed);
    // Get random 5 unreviewed photos
    const randomPhotos = unreviewedPhotos
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    
    set({ dailyPhotos: randomPhotos });
  },
}));