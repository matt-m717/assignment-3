const fs = require('fs')
const csv = require('csv-parser')

async function readWorkoutsCSV(path) {
    return new Promise((resolve, reject) => {
        const results = []
        fs.createReadStream(path)
        .on('error', (error) => {
            reject(error)
        })
        .pipe(csv())
        .on('data', (row) => {
            results.push(row)
        })
        .on('end', () => {
            resolve(results)
        })
    })
}

function getTotalWorkouts(workouts) {
    return workouts.length
}

function getTotalDuration(workouts) {
    return workouts
    .map((workout) => parseInt(workout.duration))
    .reduce((total, current) => total + current)
}

async function readWorkoutData(path) {
    try {
        const workouts = await readWorkoutsCSV(path)

        const totalWorkouts = getTotalWorkouts(workouts)
        console.log(`// Total workouts: ${totalWorkouts}`)

        const totalDuration = getTotalDuration(workouts)
        console.log(`// Total minutes: ${totalDuration}`)
        return { totalWorkouts, totalDuration }
    } catch (e) {
        console.log(`Error occured while reading workout CSV: ${e.message}`)
        return {}
   }
}

module.exports = {
    readWorkoutData
}