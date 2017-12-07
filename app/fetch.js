import fetch from 'isomorphic-fetch'

export async function get(page='1', type='news', id, name) {
	const baseUrl = `https://node-hnapi.herokuapp.com/`
	console.log('getching page' + page)
	const path = !(id || name) ? `${type}?page=${page}` 
							 : (id ? `item/${id}` : `user/${name}`)
	const endpoint = `${baseUrl}${path}`
	const res = await fetch(endpoint)
	const json = await res.json()
	return json
}