const fs = require("fs/promises")

function getHealthMetrics(data) {
    return JSON.parse(data).metrics.length
}

async function readHealthMetrics(path) {
    try {
        const data = await fs.readFile(path, "utf-8")
        const totalEntries = getHealthMetrics(data)
        console.log(`// Total health entries: ${totalEntries}`)
        return totalEntries
    } catch (e) {
        console.log(`Error occured while reading health metrics: ${e.message}`)
        return null
    }
}

module.exports = {
    readHealthMetrics
}