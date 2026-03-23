const ProgressTracker = require('../models/ProgressTracker');
const User = require('../models/User');

const defaultTrackerData = {
    coursesCompleted: 0,
    quizScores: [],
    studyStreak: { lastDate: null, streak: 0 },
    totalHours: 0,
    topicMastery: {
        'Thermodynamics': 0,
        'Quantum Mechanics': 0,
        'Fluid Dynamics': 0,
        'Relativity': 0
    },
    timePerDifficulty: {
        easy: { time: 0, count: 0 },
        medium: { time: 0, count: 0 },
        hard: { time: 0, count: 0 }
    },
    recentActivity: []
};

// @desc    Get user tracker data
// @route   GET /api/tracker/:firebaseUid
// @access  Public (should be protected in prod)
const getTrackerData = async (req, res) => {
    try {
        const { firebaseUid } = req.params;

        // Find or create user
        let user = await User.findOne({ firebaseUid });
        if (!user) {
            user = await User.create({ firebaseUid, email: req.query.email || 'unknown@email.com' });
        }

        // Find tracker data
        let tracker = await ProgressTracker.findOne({ firebaseUid });

        if (!tracker) {
            // Create default data if none exists
            tracker = await ProgressTracker.create({
                user: user._id,
                firebaseUid: firebaseUid,
                ...defaultTrackerData
            });
        }

        res.status(200).json(tracker);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching tracker data' });
    }
};

// @desc    Update user tracker data
// @route   PUT /api/tracker/:firebaseUid
// @access  Public (should be protected in prod)
const updateTrackerData = async (req, res) => {
    try {
        const { firebaseUid } = req.params;
        const updateData = req.body;

        let tracker = await ProgressTracker.findOne({ firebaseUid });

        if (!tracker) {
            return res.status(404).json({ message: 'Tracker not found' });
        }

        // We update the document with new data received from the frontend
        tracker = await ProgressTracker.findOneAndUpdate(
            { firebaseUid },
            { $set: updateData },
            { new: true } // return updated doc
        );

        res.status(200).json(tracker);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error updating tracker data' });
    }
};

module.exports = {
    getTrackerData,
    updateTrackerData
};
