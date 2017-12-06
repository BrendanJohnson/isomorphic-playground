const routes = module.exports = require('next-routes')()

routes
.add({name: 'search', pattern: '/:suburb-:postcode(\\d+)-:tags+', page: 'search'})
.add('about')
