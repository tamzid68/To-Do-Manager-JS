const fs = require('fs').promises;

const readData = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        if (!data.trim()) return []; // If the file is empty, return an empty array
        // Parse the JSON data from the file
        return JSON.parse(data);
    }
    catch (error) {
        // If the error is 'ENOENT' (Error NO ENTry), it means the file doesn't exist.
        // This is expected when the app runs for the first time. Return an empty array.
        if (error.code === 'ENOENT')
            return [];

        throw error;
    }

};

const writeData = async (filePath, data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonData, 'utf8');
    }
    catch (error) {
        throw error;
    }
};


module.exports = {
    readData,
    writeData,
};