import { CronJob } from 'cron';
import fs from 'fs';
import path from 'path';

const folderPath = '/home/stanislav/GitHub_Repositories/RoyalQuest-Logs-Analyzer/ExpressServer/src/files/uploads';

const cleanupOldFiles = new CronJob('* */6 * * *', () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log('Error reading folder contents: ', err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.log('Unlink error', unlinkErr);
        } else {
          console.log(`File deleted successfully`);
        }
      });
    });
  });
});

export default cleanupOldFiles;
