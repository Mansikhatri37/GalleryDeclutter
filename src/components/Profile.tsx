import React from 'react';
import { useStore } from '../store/useStore';
import { User as UserIcon, Calendar, Award, Settings } from 'lucide-react';

function Profile() {
  const { user } = useStore();

  const stats = [
    {
      icon: Calendar,
      label: 'Current Streak',
      value: user?.streak || 0,
      unit: 'days',
    },
    {
      icon: Award,
      label: 'Total Points',
      value: user?.points || 0,
      unit: 'pts',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-12 h-12 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{user?.name || 'Guest User'}</h1>
            <p className="text-gray-600">{user?.email || 'Not signed in'}</p>
          </div>
          <button className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map(({ icon: Icon, label, value, unit }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
                <h3 className="font-medium text-gray-700">{label}</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {value} <span className="text-lg font-normal text-gray-600">{unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {/* Placeholder for recent activity - would be populated from backend */}
          <div className="flex items-center gap-4 text-gray-600">
            <Calendar className="w-5 h-5" />
            <p>Completed daily challenge</p>
            <span className="ml-auto text-sm">Today</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <Award className="w-5 h-5" />
            <p>Earned "Week Warrior" achievement</p>
            <span className="ml-auto text-sm">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;