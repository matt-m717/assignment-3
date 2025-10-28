const { readHealthMetrics } = require('./healthReader');
const { readWorkoutData } = require('./workoutReader');

require('dotenv').config();

processFiles()

async function processFiles() {
    const userName = process.env.USER_NAME
    const weeklyGoal = process.env.WEEKLY_GOAL

    console.log("// Processing data for:", userName)
    console.log("// 📁 Reading workout data...")
    const { totalWorkouts, totalDuration } = await readWorkoutData("./data/workouts.csv")
    console.log("// 📁 Reading health data...")
    const healthData = await readHealthMetrics("./data/health-metrics.json")
    
    console.log("// === SUMMARY ===")
    console.log(`// Workouts found: ${totalWorkouts ?? "Error"}`)
    console.log(`// Total workout minutes: ${totalDuration ?? "Error"}`)
    console.log(`// Health entries found: ${healthData ?? "Error"}`)
    console.log(`// Weekly goal: ${weeklyGoal} minutes`)

    if (totalDuration == null) return
    if (totalDuration > weeklyGoal) {
        console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`)
    } else if (totalDuration == weeklyGoal) {
        console.log(`Good job ${userName}! You have met your weekly goal!`)
    } else {
        console.log(`🙁 Unfortunately ${userName} you did not meet your weekly goal.`)
    }
}