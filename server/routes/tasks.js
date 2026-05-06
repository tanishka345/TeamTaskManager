const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize('Admin'), async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      createdBy: req.user._id
    });

    await task.save();
    
    const populatedTask = await Task.findById(task._id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { status, project: projectFilter, assignedTo: userFilter, search } = req.query;

    let query = {};

    if (req.user.role !== 'Admin') {
      const userId = req.user._id;
      const userProjects = await Project.find({
        $or: [
          { createdBy: userId },
          { members: userId }
        ]
      }).distinct('_id');
      
      query.$or = [
        { assignedTo: userId },
        { project: { $in: userProjects } }
      ];
    }

    if (status) {
      query.status = status;
    }

    if (projectFilter) {
      query.project = projectFilter;
    }

    if (userFilter) {
      query.assignedTo = userFilter;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query)
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    const tasksWithOverdue = tasks.map(task => ({
      ...task.toObject(),
      isOverdue: task.dueDate && 
        new Date(task.dueDate) < new Date() && 
        task.status !== 'Completed'
    }));

    res.json(tasksWithOverdue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/stats', auth, async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== 'Admin') {
      const userId = req.user._id;
      const userProjects = await Project.find({
        $or: [
          { createdBy: userId },
          { members: userId }
        ]
      }).distinct('_id');
      
      query.$or = [
        { assignedTo: userId },
        { project: { $in: userProjects } }
      ];
    }

    const tasks = await Task.find(query);
    const now = new Date();

    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      pending: tasks.filter(t => t.status === 'Pending').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      overdue: tasks.filter(t => 
        t.dueDate && 
        new Date(t.dueDate) < now && 
        t.status !== 'Completed'
      ).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, assignedTo, status, dueDate, project } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role !== 'Admin' && task.assignedTo?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo && req.user.role === 'Admin') task.assignedTo = assignedTo;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    if (project && req.user.role === 'Admin') task.project = project;

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', auth, authorize('Admin'), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;