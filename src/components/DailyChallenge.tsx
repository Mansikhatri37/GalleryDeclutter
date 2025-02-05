import React, { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { toast } from 'react-toastify';

function DailyChallenge() {
  const { dailyPhotos, updatePhotoDecision, getNewDailyPhotos } = useStore();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    // Get new daily photos when component mounts
    if (dailyPhotos.length === 0) {
      getNewDailyPhotos();
    }
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleDecision('delete'),
    onSwipedRight: () => handleDecision('keep'),
  });

  const handleDecision = (decision: 'keep' | 'delete') => {
    if (currentIndex >= dailyPhotos.length) return;
    
    updatePhotoDecision(dailyPhotos[currentIndex].id, decision);
    setCurrentIndex((prev) => prev + 1);
    
    if (currentIndex === dailyPhotos.length - 1) {
      toast.success('Daily challenge completed! 🎉');
      // Reset index for next session
      setCurrentIndex(0);
      // Get new batch of photos for next session
      getNewDailyPhotos();
    }
  };

  if (dailyPhotos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">All Done!</h2>
        <p className="text-gray-600">All photos have been reviewed. Upload more photos to continue decluttering.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Declutter</h1>
        <p className="text-gray-600">
          Swipe right to keep, left to delete ({currentIndex + 1}/{dailyPhotos.length})
        </p>
      </div>

      <div {...handlers} className="relative h-96 w-full">
        <AnimatePresence>
          {currentIndex < dailyPhotos.length && (
            <motion.div
              key={dailyPhotos[currentIndex].id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0"
            >
              <img
                src={dailyPhotos[currentIndex].url}
                alt="Photo"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-8 mt-8">
        <button
          onClick={() => handleDecision('delete')}
          className="p-4 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleDecision('keep')}
          className="p-4 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors"
        >
          <Check className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default DailyChallenge;