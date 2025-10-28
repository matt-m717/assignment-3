const path = require('path'); 
const fs = require('fs/promises')
const { readWorkoutData } = require('../workoutReader');

const TEST_CSV_FILE = path.join("./tests", "test-workouts.csv")
const testCsvData = `date,exercise,duration,calories
2024-05-01,Running,15,300
2024-01-06,Push-ups,45,100`

beforeAll(async () => {
    console.log(testCsvData)
    await fs.writeFile(TEST_CSV_FILE, testCsvData)
});

afterAll(async () => {
    try {
        await fs.unlink(TEST_CSV_FILE);
    } catch {}
});

describe("readWorkoutData", () => { 
    test("reads a valid workouts csv and returns total workouts and duration", async () => { 
          const { totalWorkouts, totalDuration } = await readWorkoutData(TEST_CSV_FILE)
          expect(totalWorkouts).toBe(2)
          expect(totalDuration).toBe(60)
    }); 

    test("returns an empty object on error", async () => { 
        const result = await readWorkoutData("not_a_file.json");
        expect(result).toEqual({});
    }); 
});