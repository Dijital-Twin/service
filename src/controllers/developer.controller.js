const { handleAsync } = require('../services/error.service')
const { queryDatabase } = require('../services/db.service')

const health = async (_, res) => {
    dbResponse = queryDatabase('SELECT NOW()')
    if (dbResponse) {
        res.status(200).send('OK')
    }
    else {
        throw new Error('Database is not healthy')
    }
}

module.exports = {
    health: handleAsync(health)
}