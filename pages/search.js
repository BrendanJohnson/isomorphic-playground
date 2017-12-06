const React = require('react')

export default class Search extends React.Component {
	static async getInitialProps ({query}) {
		console.log(query)
		return {}

	}
	render () {
		return <div>Search page!</div>
	}
}