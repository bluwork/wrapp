import fs from 'fs';

const DIR_PATH = process.env.REPORTS_FILE_DIRECTORY || './data';
const FILE_NAME = process.env.REPORTS_FILE_NAME || 'reports.csv';

const processReport = async (report: WitnessReport) => {
  try {
    const row = [
      report.caseRelatedName,
      report.witnessPhoneNumber,
      report.country,
      report.reportedAt,
    ];
    const line = row.join(',') + '\n';
    const stream = fs.createWriteStream(DIR_PATH + '/' + FILE_NAME, {
      flags: 'a',
    });
    stream.write(line);
    stream.end();
    return report;
  } catch (error) {
    console.error(error);
  }
};

export default {
  processReport,
};
