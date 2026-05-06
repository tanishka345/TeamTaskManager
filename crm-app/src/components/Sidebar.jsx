import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  CheckSquare, 
  LogOut,
  ChevronLeft
} from 'lucide-react';
import Avatar from './Avatar';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/team', icon: Users, label: 'Team' },
  { path: '/tasks', icon: CheckSquare, label: 'Tasks' }
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-gray-900">TeamTask</span>
            )}
          </div>
          <button 
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        
        <div className="px-3 py-4 border-t border-gray-100">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-3'} py-2`}>
            <Avatar name={user?.name} initials={getInitials(user?.name)} size="md" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.role || 'Member'}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 mt-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;