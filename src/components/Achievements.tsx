import React from 'react';
import { useStore } from '../store/useStore';
import { Trophy, Star, Calendar, Zap, Award } from 'lucide-react';

function Achievements() {
  const { achievements } = useStore();

  const defaultAchievements = [
    {
      id: '1',
      title: 'Getting Started',
      description: 'Complete your first daily declutter challenge',
      icon: Star,
      requiredPoints: 10,
      unlocked: true,
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: Calendar,
      requiredPoints: 50,
      unlocked: false,
    },
    {
      id: '3',
      title: 'Space Saver',
      description: 'Free up 1GB of storage',
      icon: Zap,
      requiredPoints: 100,
      unlocked: false,
    },
    {
      id: '4',
      title: 'Master Organizer',
      description: 'Review 100 photos',
      icon: Award,
      requiredPoints: 200,
      unlocked: false,
    },
  ];

  const displayAchievements = achievements.length > 0 ? achievements : defaultAchievements;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Achievements</h1>
        <p className="text-gray-600">Track your decluttering progress and earn rewards!</p>
      </div>

      <div className="grid gap-6">
        {displayAchievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`bg-white rounded-lg shadow-md p-6 flex items-center gap-6 ${
                achievement.unlocked ? 'border-2 border-yellow-400' : ''
              }`}
            >
              <div className={`p-4 rounded-full ${
                achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
              }`}>
                <Icon className={`w-8 h-8 ${
                  achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  {achievement.requiredPoints} points
                </div>
                {achievement.unlocked ? (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Unlocked
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Achievements;