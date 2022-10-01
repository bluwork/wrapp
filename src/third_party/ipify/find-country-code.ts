import countrySearch from './config/country-search';

// TODO Implement caching to reduce ipify calls by remembering country for asked IP

const findCountryCode = async (
  apiKey: string,
): Promise<CountrySearchResult> => {
  const searchResult = {} as CountrySearchResult;
  try {
    const result = await fetch(
      countrySearch.URL + '?' + countrySearch.API_KEY_QUERY + apiKey,
    );

    const data = await result.json();
    searchResult.countryCode = data?.location?.country;
  } catch (error) {
    searchResult.error = error;
  }
  return searchResult;
};

export default findCountryCode;
