const processReport = jest
  .fn()
  .mockImplementation(async (report: WitnessReport) => {
    try {
      return report;
    } catch (error) {
      console.error(error);
    }
  });

export default {
  processReport,
};
