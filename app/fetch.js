const LRU = require('lru-cache')
import fetch from 'isomorphic-fetch'

const cache = LRU({
	max: 500,
	length: function(n, key) {
		return n * 2 + key.length;
	},
	maxAge: 1000 * 60 // 60 seconds in milliseconds
})

export async function get(page='1', appendToCached=false, type='news', id, name) {

	const baseUrl = `https://node-hnapi.herokuapp.com/`
	let path = !(id || name) ? `${type}?page=${page}` 
							 : (id ? `item/${id}` : `user/${name}`)

	const endpoint = `${baseUrl}${path}`
	const storedResponse = cache.get(endpoint)

	// If the cache contains the response use the stored response
	if (typeof storedResponse !== 'undefined') return storedResponse
 	// Otherwise fetch it from the endpoint and add it to the cache
	const res = await fetch(endpoint)
	const json = await res.json()
	cache.set(endpoint, json)
	return json
}