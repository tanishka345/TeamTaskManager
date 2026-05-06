require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const User = require('./models/User');
  const Task = require('./models/Task');
  const Project = require('./models/Project');
  
  const member = await User.findOne({ email: 'ajlksnda@gmail.com' });
  console.log('Member:', member.name, member._id);
  
  const allTasks = await Task.find();
  console.log('All tasks in DB:', allTasks.length);
  allTasks.forEach(t => console.log('-', t.title, 'assignedTo:', t.assignedTo?.toString()));
  
  const userId = member._id;
  const userProjects = await Project.find({
    $or: [{ createdBy: userId }, { members: userId }]
  }).distinct('_id');
  console.log('User projects:', userProjects.length);
  
  const query = {
    $or: [
      { assignedTo: userId },
      { project: { $in: userProjects } }
    ]
  };
  
  const memberTasks = await Task.find(query);
  console.log('Tasks member can see:', memberTasks.length);
  
  process.exit(0);
}).catch(console.error);