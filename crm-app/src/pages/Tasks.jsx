import { useState } from 'react';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Input, { Select, Textarea } from '../components/Input';
import Avatar from '../components/Avatar';
import { tasks as initialTasks } from '../data/mockData';

const columns = [
  { id: 'todo', title: 'To Do', color: 'gray' },
  { id: 'inProgress', title: 'In Progress', color: 'blue' },
  { id: 'completed', title: 'Completed', color: 'green' }
];

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
  urgent: 'danger'
};

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    priority: 'medium',
    assignee: '',
    status: 'todo'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: formData.title,
      dueDate: formData.dueDate,
      priority: formData.priority,
      assignee: formData.assignee || 'UN'
    };
    setTasks({
      ...tasks,
      [formData.status]: [...tasks[formData.status], newTask]
    });
    setShowModal(false);
    setFormData({ title: '', dueDate: '', priority: 'medium', assignee: '', status: 'todo' });
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    const task = tasks[fromColumn].find(t => t.id === taskId);
    if (!task) return;
    
    setTasks({
      ...tasks,
      [fromColumn]: tasks[fromColumn].filter(t => t.id !== taskId),
      [toColumn]: [...tasks[toColumn], task]
    });
  };

  const deleteTask = (taskId, column) => {
    setTasks({
      ...tasks,
      [column]: tasks[column].filter(t => t.id !== taskId)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${column.color}-500`} />
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="text-sm text-gray-500">({tasks[column.id].length})</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-3 min-h-[400px] p-3 bg-gray-50 rounded-xl">
              {tasks[column.id].length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                  No tasks
                </div>
              ) : (
                tasks[column.id].map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow cursor-move">
                    <CardBody className="p-4">
                      <div className="flex items-start justify-between">
                        <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                        <button 
                          onClick={() => deleteTask(task.id, column.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <Avatar name={task.assignee} initials={task.assignee} size="sm" />
                        <div className="flex gap-1">
                          {column.id !== 'completed' && (
                            <button 
                              onClick={() => moveTask(task.id, column.id, column.id === 'todo' ? 'inProgress' : 'completed')}
                              className="text-xs text-indigo-600 hover:text-indigo-700"
                            >
                              {column.id === 'todo' ? 'Start' : 'Complete'}
                            </button>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Task Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required placeholder="Enter task title" />
          <Input label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} />
          <Select label="Priority" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'urgent', label: 'Urgent' }
          ]} />
          <Select label="Status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} options={[
            { value: 'todo', label: 'To Do' },
            { value: 'inProgress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' }
          ]} />
          <Input label="Assignee Initials" value={formData.assignee} onChange={(e) => setFormData({...formData, assignee: e.target.value})} placeholder="JS" />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;