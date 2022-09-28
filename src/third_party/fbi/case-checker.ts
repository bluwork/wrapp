import titleValidation from './config/title-validation';

const caseInfo = async (caseTitle: string): Promise<CaseSearchResult> => {
  const searchResult: CaseSearchResult = {
    caseFound: false,
    resultsFound: 0,
  };

  try {
    const result = await fetch(
      titleValidation.URL + '?' + titleValidation.QUERY + caseTitle,
    );
    const data = await result.json();

    searchResult.resultsFound = data.total;

    if (data?.items?.length > 0) {
      const found = data.items.find(
        (item: SearchItem) =>
          item.title.toLowerCase() === caseTitle.toLowerCase(),
      );
      if (found) {
        searchResult.caseFound = true;
      }
    }
  } catch (error) {
    searchResult.error = error;
  }
  return searchResult;
};

export default { caseInfo };
