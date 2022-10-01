import countrySearch from '../config/country-search';

const findCountryCode = jest
  .fn()
  .mockImplementation(async (apiKey: string): Promise<CountrySearchResult> => {
    const searchResult = {} as CountrySearchResult;
    try {
      searchResult.countryCode = 'FR';
    } catch (error) {
      searchResult.error = error;
    }
    return searchResult;
  });

export default findCountryCode;
