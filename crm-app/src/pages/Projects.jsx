import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, MapPin, FolderKanban, Users } from 'lucide-react';
import Card, { CardBody } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Input, { Select, Textarea } from '../components/Input';
import { companies as initialProjects } from '../data/mockData';

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    location: '',
    industry: ''
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...formData, id: p.id } : p));
    } else {
      setProjects([...projects, { ...formData, id: projects.length + 1, employees: 0 }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', status: 'Active', location: '', industry: '' });
    setEditingProject(null);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setShowModal(true);
  };

  const statusVariants = {
    'Active': 'success',
    'Lead': 'info',
    'Inactive': 'danger',
    'In Progress': 'warning',
    'Completed': 'success'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'Active', label: 'Active' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' }
            ]}
            className="w-40"
          />
        </div>
        <Button onClick={() => { resetForm(); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No projects found
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow duration-200">
              <CardBody className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <FolderKanban className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{project.name}</p>
                      <Badge variant={statusVariants[project.status]} className="mt-1">{project.status}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(project)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-1.5 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.industry || 'No description'}
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {project.location || 'No location'}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    {project.employees || 0}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editingProject ? 'Edit Project' : 'Create New Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Project Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Enter project name" />
          <Textarea label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Project description" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Remote / Office" />
            <Select label="Status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} options={[
              { value: 'Active', label: 'Active' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'On Hold', label: 'On Hold' }
            ]} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</Button>
            <Button type="submit">{editingProject ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;