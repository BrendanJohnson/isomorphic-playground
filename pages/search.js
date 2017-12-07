import React from 'react'
import { Link } from "../routes";
import { get } from "../app/fetch"
import Property from "../components/property";

export default class Search extends React.Component {
	static async getInitialProps ({ query: { page = "1", suburb = "Surry", postcode = "2010", tags = "metal", infinite} }) {
		console.log('render component')
		console.log(infinite)
		const hnData = await get(page)
		//console.log(hnData)
		
		return { data: hnData, suburb, page, postcode, tags }

	}

	async componentDidMount() {

		console.log();


	}
	render () {
		const { data, suburb, postcode, tags, page } = this.props
		const nextPage = parseInt(page, 10) + 1;
		return (
			<main>
				<h3>Search for properties in {suburb}:</h3>
				<section>
					{ data.length
						? data.map((property, index) => <Property key={property.id} {...property} />)
						: <div>No more properties</div> }
				</section>
				<Link route="search" params={{ suburb: suburb, postcode: postcode, tags: tags, page: nextPage, infinite: true }}>
			          <a>
			            <span>More</span>
			          </a>
			     </Link>
				<Link prefetch route="search" params={{ suburb: suburb, postcode: postcode, tags: tags, page: nextPage }}>
			          <a>
			            <span>Next Page</span>
			          </a>
			     </Link>

			</main>
		)
	}
}