const path = require("path"); 
const fs = require("fs/promises")
const { readHealthMetrics } = require("../healthReader.js");

const TEST_FILE = path.join("./tests", "test-health-metrics.json")
const testData = {
    user: 'TestUser',
    metrics: [
    { 
        date: "2024-01-01",
        type: "nutrition",
        calories: 2100
    },
    {
        date: "2024-01-01",
        type: "sleep",
        duration: 7.5
    }], 
}; 

beforeAll(async () => { 
    await fs.writeFile(TEST_FILE, JSON.stringify(testData))
});

afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch {}
});

describe("readHealthMetrics", () => { 
    test("reads a valid health metrics json", async () => { 
          const result = await readHealthMetrics(TEST_FILE)
          expect(result).toBe(2)
    }); 

    test("returns -1 when encountering an error", async () => { 
        const result = await readHealthMetrics("not_a_file.json");
        expect(result).toBe(null);
    }); 
});