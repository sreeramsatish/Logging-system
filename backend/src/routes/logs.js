const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, actionType, startDate, endDate } = req.query;
    const query = { isDeleted: false };

    if (req.user.role !== 'admin') {
      query.userId = req.user.userId;
    }

    if (actionType) query.actionType = actionType;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    const logs = await Log.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('userId', 'username');

    const total = await Log.countDocuments(query);

    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const log = await Log.findById(req.params.id);
      
      if (!log) return res.status(404).json({ message: 'Log not found' });
      
      if (req.user.role !== 'admin' && log.userId.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      log.isDeleted = true;
      await log.save();
      
      const deleteLog = new Log({
        actionType: 'delete_log',
        userId: req.user.userId,
        role: req.user.role,
        additionalData: { deletedLogId: log._id }
      });
      await deleteLog.save();
      res.json({ message: 'Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/export', authenticateToken, async (req, res) => {
  try {
    const query = { isDeleted: false };
    if (req.user.role !== 'admin') {
      query.userId = req.user.userId;
    }

    const logs = await Log.find(query).populate('userId', 'username');
    
    if (req.query.format === 'csv') {
      const csv = [
        'Timestamp,Action Type,Username,Role',
        ...logs.map(log => 
          ${log.timestamp},${log.actionType},${log.userId.username},${log.role}
        )
    ].join('\n');
    
    res.header('Content-Type', 'text/csv');
    res.attachment('logs.csv');
    return res.send(csv);
  }

  res.json(logs);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

module.exports = router;
