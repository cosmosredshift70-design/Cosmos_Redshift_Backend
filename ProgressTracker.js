const mongoose = require('mongoose');

const ProgressTrackerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firebaseUid: {
        type: String,
        required: true,
    },
    coursesCompleted: {
        type: Number,
        default: 0,
    },
    quizScores: {
        type: [Number],
        default: [],
    },
    studyStreak: {
        lastDate: { type: String, default: null },
        streak: { type: Number, default: 0 },
    },
    totalHours: {
        type: Number,
        default: 0,
    },
    topicMastery: {
        type: Map,
        of: Number,
        default: {
            'Thermodynamics': 0,
            'Quantum Mechanics': 0,
            'Fluid Dynamics': 0,
            'Relativity': 0
        }
    },
    timePerDifficulty: {
        easy: { time: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
        medium: { time: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
        hard: { time: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
    },
    recentActivity: [
        {
            action: String,
            score: String,
            timestamp: Number,
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('ProgressTracker', ProgressTrackerSchema);
