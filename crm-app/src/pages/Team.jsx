import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Mail, Phone, Briefcase } from 'lucide-react';
import Card, { CardBody } from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import { contacts as initialTeam } from '../data/mockData';

const Team = () => {
  const [team, setTeam] = useState(initialTeam);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    company: ''
  });

  const roles = [...new Set(initialTeam.map(m => m.role))];

  const filteredTeam = team.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    if (editingMember) {
      setTeam(team.map(m => m.id === editingMember.id ? { ...formData, id: m.id, avatar: initials } : m));
    } else {
      setTeam([...team, { ...formData, id: team.length + 1, avatar: initials }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeam(team.filter(m => m.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', role: '', company: '' });
    setEditingMember(null);
  };

  const openEdit = (member) => {
    setEditingMember(member);
    setFormData(member);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <Button onClick={() => { resetForm(); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTeam.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No team members found
          </div>
        ) : (
          filteredTeam.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow duration-200">
              <CardBody className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} initials={member.avatar} size="lg" />
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <Badge variant="info">{member.role}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(member)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-1.5 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    {member.company}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editingMember ? 'Edit Member' : 'Add Team Member'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="John Doe" />
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="john@company.com" />
          <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 555-0000" />
          <Input label="Role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required placeholder="Developer" />
          <Input label="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="Tech Corp" />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</Button>
            <Button type="submit">{editingMember ? 'Update' : 'Add'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Team;