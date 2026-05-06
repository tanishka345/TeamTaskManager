import { FolderKanban, Users, CheckSquare, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Card, { CardHeader, CardBody } from '../components/Card';
import { statsData, revenueData, upcomingEvents, tasks } from '../data/mockData';

const StatCard = ({ icon: Icon, label, value, change, iconBg, iconColor }) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardBody className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <div className={`flex items-center gap-1 mt-2 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} />
              <span>{isPositive ? '+' : ''}{change}% from last month</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${iconBg}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const EventItem = ({ event }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500'
  };
  
  return (
    <div className="flex items-start gap-4 py-3">
      <div className={`w-3 h-3 rounded-full mt-1.5 ${colorClasses[event.color]}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{event.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.time}
        </p>
      </div>
    </div>
  );
};

const TaskItem = ({ task, status }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
    urgent: 'bg-red-200 text-red-800'
  };
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${status === 'completed' ? 'bg-green-500' : status === 'inProgress' ? 'bg-blue-500' : 'bg-gray-400'}`} />
        <span className="text-sm text-gray-700">{task.title}</span>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>
    </div>
  );
};

const Dashboard = () => {
  const allTasks = [...tasks.todo, ...tasks.inProgress, ...tasks.completed];
  const completedTasks = tasks.completed.length;
  const pendingTasks = tasks.todo.length;
  const inProgressTasks = tasks.inProgress.length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={FolderKanban} 
          label="Projects" 
          value={statsData.companies} 
          change={statsData.companiesChange}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard 
          icon={Users} 
          label="Team Members" 
          value={statsData.contacts} 
          change={statsData.contactsChange}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard 
          icon={CheckSquare} 
          label="Total Tasks" 
          value={allTasks.length} 
          change={5}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Completed" 
          value={completedTasks} 
          change={12}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Task Overview</h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>This week</option>
            </select>
          </CardHeader>
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData.slice(0, 6)}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="deals" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTasks)" 
                    name="Tasks"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Task Status</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                  <span className="text-sm text-gray-600">To Do</span>
                </div>
                <span className="font-semibold text-gray-900">{pendingTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
                <span className="font-semibold text-gray-900">{inProgressTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <span className="font-semibold text-gray-900">{completedTasks}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <div className="bg-gray-400" style={{ width: `${(pendingTasks / allTasks.length) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(inProgressTasks / allTasks.length) * 100}%` }} />
                    <div className="bg-green-500" style={{ width: `${(completedTasks / allTasks.length) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100 px-6">
              {upcomingEvents.slice(0, 5).map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100 px-6">
              <TaskItem task={tasks.todo[0]} status="todo" />
              <TaskItem task={tasks.inProgress[0]} status="inProgress" />
              <TaskItem task={tasks.completed[0]} status="completed" />
              <TaskItem task={tasks.todo[1]} status="todo" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;