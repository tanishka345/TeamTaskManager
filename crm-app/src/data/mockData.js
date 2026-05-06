export const statsData = {
  companies: 248,
  contacts: 1842,
  dealsInPipeline: 156,
  revenue: 2845000,
  revenueChange: 12.5,
  companiesChange: 8.2,
  contactsChange: 15.3,
  dealsChange: -3.1
};

export const revenueData = [
  { month: 'Jan', revenue: 185000, deals: 12 },
  { month: 'Feb', revenue: 225000, deals: 18 },
  { month: 'Mar', revenue: 198000, deals: 14 },
  { month: 'Apr', revenue: 275000, deals: 22 },
  { month: 'May', revenue: 310000, deals: 28 },
  { month: 'Jun', revenue: 285000, deals: 24 },
  { month: 'Jul', revenue: 345000, deals: 32 },
  { month: 'Aug', revenue: 320000, deals: 29 },
  { month: 'Sep', revenue: 380000, deals: 35 },
  { month: 'Oct', revenue: 410000, deals: 38 },
  { month: 'Nov', revenue: 395000, deals: 36 },
  { month: 'Dec', revenue: 445000, deals: 42 }
];

export const upcomingEvents = [
  { id: 1, title: 'Client meeting with Acme Corp', date: '2024-01-15', time: '10:00 AM', type: 'meeting', color: 'blue' },
  { id: 2, title: 'Product demo for TechStart', date: '2024-01-15', time: '2:00 PM', type: 'demo', color: 'purple' },
  { id: 3, title: 'Contract negotiation call', date: '2024-01-16', time: '11:00 AM', type: 'call', color: 'green' },
  { id: 4, title: 'Quarterly review presentation', date: '2024-01-17', time: '3:00 PM', type: 'presentation', color: 'orange' },
  { id: 5, title: 'Team sync meeting', date: '2024-01-18', time: '9:00 AM', type: 'meeting', color: 'blue' }
];

export const companies = [
  { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1 555-0123', address: '123 Business Ave, San Francisco, CA', industry: 'Technology', location: 'San Francisco, CA', status: 'Active', employees: 450 },
  { id: 2, name: 'TechStart Inc', email: 'hello@techstart.io', phone: '+1 555-0124', address: '456 Innovation Blvd, Austin, TX', industry: 'Software', location: 'Austin, TX', status: 'Active', employees: 120 },
  { id: 3, name: 'Global Solutions Ltd', email: 'info@globalsol.com', phone: '+1 555-0125', address: '789 Commerce St, New York, NY', industry: 'Consulting', location: 'New York, NY', status: 'Lead', employees: 89 },
  { id: 4, name: 'Green Energy Co', email: 'team@greenenergy.com', phone: '+1 555-0126', address: '321 Eco Way, Portland, OR', industry: 'Energy', location: 'Portland, OR', status: 'Active', employees: 234 },
  { id: 5, name: 'FinanceHub', email: 'support@financehub.com', phone: '+1 555-0127', address: '654 Wall Street, New York, NY', industry: 'Finance', location: 'New York, NY', status: 'Inactive', employees: 567 },
  { id: 6, name: 'HealthPlus', email: 'care@healthplus.com', phone: '+1 555-0128', address: '987 Medical Dr, Boston, MA', industry: 'Healthcare', location: 'Boston, MA', status: 'Active', employees: 890 },
  { id: 7, name: 'EduLearn', email: 'students@edulearn.org', phone: '+1 555-0129', address: '147 Education Lane, Chicago, IL', industry: 'Education', location: 'Chicago, IL', status: 'Lead', employees: 156 },
  { id: 8, name: 'LogiTrans', email: 'operations@logitrans.com', phone: '+1 555-0130', address: '258 Shipping Ave, Miami, FL', industry: 'Logistics', location: 'Miami, FL', status: 'Active', employees: 345 }
];

export const contacts = [
  { id: 1, name: 'John Smith', email: 'john@acme.com', phone: '+1 555-1001', company: 'Acme Corporation', avatar: 'JS', role: 'CEO' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@techstart.io', phone: '+1 555-1002', company: 'TechStart Inc', avatar: 'SJ', role: 'CTO' },
  { id: 3, name: 'Michael Chen', email: 'michael@globalsol.com', phone: '+1 555-1003', company: 'Global Solutions Ltd', avatar: 'MC', role: 'Director' },
  { id: 4, name: 'Emily Davis', email: 'emily@greenenergy.com', phone: '+1 555-1004', company: 'Green Energy Co', avatar: 'ED', role: 'VP Operations' },
  { id: 5, name: 'David Wilson', email: 'david@financehub.com', phone: '+1 555-1005', company: 'FinanceHub', avatar: 'DW', role: 'CFO' },
  { id: 6, name: 'Lisa Martinez', email: 'lisa@healthplus.com', phone: '+1 555-1006', company: 'HealthPlus', avatar: 'LM', role: 'Head of Sales' },
  { id: 7, name: 'James Brown', email: 'james@edulearn.org', phone: '+1 555-1007', company: 'EduLearn', avatar: 'JB', role: 'Principal' },
  { id: 8, name: 'Amanda Lee', email: 'amanda@logitrans.com', phone: '+1 555-1008', company: 'LogiTrans', avatar: 'AL', role: 'Logistics Manager' }
];

export const tasks = {
  todo: [
    { id: 1, title: 'Prepare quarterly report', dueDate: '2024-01-20', priority: 'high', assignee: 'JS' },
    { id: 2, title: 'Review marketing campaign', dueDate: '2024-01-22', priority: 'medium', assignee: 'SJ' },
    { id: 3, title: 'Update client presentations', dueDate: '2024-01-25', priority: 'low', assignee: 'MC' }
  ],
  inProgress: [
    { id: 4, title: 'Onboard new team member', dueDate: '2024-01-18', priority: 'high', assignee: 'ED' },
    { id: 5, title: 'Fix bug in dashboard', dueDate: '2024-01-19', priority: 'urgent', assignee: 'DW' }
  ],
  completed: [
    { id: 6, title: 'Deploy new feature', dueDate: '2024-01-15', priority: 'medium', assignee: 'LM' },
    { id: 7, title: 'Client onboarding call', dueDate: '2024-01-14', priority: 'low', assignee: 'JB' },
    { id: 8, title: 'Security audit', dueDate: '2024-01-12', priority: 'high', assignee: 'AL' }
  ]
};

export const employees = [
  { id: 1, name: 'Alex Thompson', role: 'CEO', department: 'Executive', email: 'alex@stratix.com', avatar: 'AT', status: 'active' },
  { id: 2, name: 'Maria Garcia', role: 'VP Sales', department: 'Sales', email: 'maria@stratix.com', avatar: 'MG', status: 'active' },
  { id: 3, name: 'James Wilson', role: 'VP Engineering', department: 'Engineering', email: 'james@stratix.com', avatar: 'JW', status: 'active' },
  { id: 4, name: 'Sophie Chen', role: 'Marketing Director', department: 'Marketing', email: 'sophie@stratix.com', avatar: 'SC', status: 'active' },
  { id: 5, name: 'David Brown', role: 'HR Manager', department: 'Human Resources', email: 'david@stratix.com', avatar: 'DB', status: 'active' },
  { id: 6, name: 'Emma Davis', role: 'Product Manager', department: 'Product', email: 'emma@stratix.com', avatar: 'ED', status: 'active' },
  { id: 7, name: 'Ryan Taylor', role: 'Sales Manager', department: 'Sales', email: 'ryan@stratix.com', avatar: 'RT', status: 'onleave' },
  { id: 8, name: 'Olivia White', role: 'Lead Developer', department: 'Engineering', email: 'olivia@stratix.com', avatar: 'OW', status: 'active' }
];

export const salesPipeline = {
  leads: [
    { id: 1, name: 'Enterprise Deal - TechCorp', value: 125000, company: 'TechCorp', probability: 20 },
    { id: 2, name: 'Annual Contract Renewal', value: 85000, company: 'GlobalTech', probability: 15 }
  ],
  qualified: [
    { id: 3, name: 'New Business Package', value: 150000, company: 'InnovateCo', probability: 40 },
    { id: 4, name: 'Expansion Deal', value: 95000, company: 'StartUp Inc', probability: 35 }
  ],
  proposal: [
    { id: 5, name: 'Premium Plan', value: 200000, company: 'MegaCorp', probability: 60 },
    { id: 6, name: 'Custom Solution', value: 175000, company: 'DataDriven', probability: 55 }
  ],
  won: [
    { id: 7, name: 'Starter Package', value: 45000, company: 'SmallBiz', probability: 100 },
    { id: 8, name: 'Pro Package', value: 78000, company: 'MidSizeCo', probability: 100 }
  ],
  lost: [
    { id: 9, name: 'Enterprise License', value: 300000, company: 'BigCorp', probability: 0 },
    { id: 10, name: 'Basic Plan', value: 12000, company: 'LocalShop', probability: 0 }
  ]
};

export const analyticsData = {
  revenueByMonth: [
    { name: 'Jan', value: 185000 },
    { name: 'Feb', value: 225000 },
    { name: 'Mar', value: 198000 },
    { name: 'Apr', value: 275000 },
    { name: 'May', value: 310000 },
    { name: 'Jun', value: 285000 }
  ],
  dealsByStage: [
    { stage: 'Leads', count: 45 },
    { stage: 'Qualified', count: 32 },
    { stage: 'Proposal', count: 24 },
    { stage: 'Won', count: 18 },
    { stage: 'Lost', count: 8 }
  ],
  conversionFunnel: [
    { stage: 'Total Leads', value: 100 },
    { stage: 'Qualified', value: 65 },
    { stage: 'Proposal Sent', value: 45 },
    { stage: 'Negotiation', value: 30 },
    { stage: 'Closed Won', value: 22 }
  ],
  monthlyGrowth: [
    { month: 'Jan', growth: 8 },
    { month: 'Feb', growth: 12 },
    { month: 'Mar', growth: 15 },
    { month: 'Apr', growth: 10 },
    { month: 'May', growth: 18 },
    { month: 'Jun', growth: 22 }
  ]
};

export const currentUser = {
  name: 'Alex Thompson',
  email: 'alex@stratix.com',
  role: 'CEO',
  avatar: 'AT'
};