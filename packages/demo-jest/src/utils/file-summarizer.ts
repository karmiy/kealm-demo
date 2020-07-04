import fs from 'fs';

function summarizeFilesInDirectorySync(directory: string) {
    return fs.readdirSync(directory).map(fileName => ({
        directory,
        fileName,
    }));
}

export default summarizeFilesInDirectorySync;