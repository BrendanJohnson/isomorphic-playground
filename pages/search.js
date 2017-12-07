import React from "react"
import { Router } from "../routes"
import { Link } from "../routes"
import { get } from "../app/fetch"
import Property from "../components/property"

export default class Search extends React.Component {
	 constructor (props) {
	 	console.log('constructor')
      super(props);
      this.state = {
        data: [],
        page: parseInt(props.page, 10)
      }
    }
	static async getInitialProps ({ query: { page="1", suburb="Surry", postcode="2010", tags="metal" } }) {
		const hnData = await get(page)
		return { data: hnData, suburb, page, postcode, tags }
	}
	async componentDidMount() {
		// Attach a listener to the scroll event on the client side
		window.addEventListener('scroll', function() {
        	console.log('scrolling');
        	const scrollTop = (window.pageYOffset !== undefined)
        					? window.pageYOffset
        					: (document.documentElement || document.body.parentNode || document.body).scrollTop;

        	const documentHeight = Math.max(
							        document.body.scrollHeight, document.documentElement.scrollHeight,
							        document.body.offsetHeight, document.documentElement.offsetHeight,
							        document.body.clientHeight, document.documentElement.clientHeight
							    );

        	const windowHeight = window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName('body')[0].clientHeight;

        	if(scrollTop == (documentHeight - windowHeight)) {
        		const { data, suburb, postcode, tags, page } = this.props
        		  get(this.state.page + 1).then((response) => {
				  	this.setState({ page: this.state.page + 1, data: [...this.state.data, ...response] })
				  })
        		//Router.pushRoute('search', { page: parseInt(this.state.page, 10) + 1, suburb, postcode, tags }, {shallow: true})

        	}

		}.bind(this));

	}
	render () {
		const { data, suburb, postcode, tags, page } = this.props
		
		return (
			<main>
				<h3>Search for {tags.replace(/-/g, ', ')} in {suburb.replace(/-/g, ' ')}:</h3>
				<section>
					{ data.length
						? [...data, ...this.state.data].map((property, index) => <Property key={property.id} {...property} />)
						: <div>No more properties</div> }
				</section>
				<Link prefetch route="search" params={{ suburb: suburb, postcode: postcode, tags: tags, page: parseInt(page, 10) + 1 }}>
			          <a>
			            <span>Next Page</span>
			          </a>
			     </Link>

			</main>
		)
	}
}