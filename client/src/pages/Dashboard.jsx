import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.tasks.getStats();
      setStats(data || { total: 0, completed: 0, pending: 0, inProgress: 0, overdue: 0 });
    } catch (error) {
      console.error('Failed to load stats:', error);
      setStats({ total: 0, completed: 0, pending: 0, inProgress: 0, overdue: 0 });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Tasks', value: stats?.total || 0, color: 'bg-blue-500', icon: '📋' },
    { label: 'Completed', value: stats?.completed || 0, color: 'bg-green-500', icon: '✅' },
    { label: 'Pending', value: stats?.pending || 0, color: 'bg-yellow-500', icon: '⏳' },
    { label: 'In Progress', value: stats?.inProgress || 0, color: 'bg-purple-500', icon: '🔄' },
    { label: 'Overdue', value: stats?.overdue || 0, color: 'bg-red-500', icon: '⚠️' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's an overview of your tasks</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/tasks"
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <p className="font-medium text-gray-900">View All Tasks</p>
            <p className="text-sm text-gray-600">See your assigned tasks</p>
          </a>
          <a
            href="/projects"
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <p className="font-medium text-gray-900">Browse Projects</p>
            <p className="text-sm text-gray-600">View your projects</p>
          </a>
          {user?.role === 'Admin' && (
            <a
              href="/projects"
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              <p className="font-medium text-gray-900">Create Project</p>
              <p className="text-sm text-gray-600">Start a new project</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;