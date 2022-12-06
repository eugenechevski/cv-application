const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7c13c2cd2dmsh79cb68395ab8d45p1cc503jsn1d8641775bb4',
		'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
	}
};

/**
 * @returns A promise of a result for a request of a quote.
 */
export default async function requestQuote(): Promise<any> {
    return fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code=en', options)
	.then(response => response.json())
    .catch((err) => console.error(err))
}