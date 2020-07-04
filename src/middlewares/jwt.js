const {verifyJwt, verifyRefreshJwt} = require('../helpers/jwt')

const checkJwt = (req,res,next) => {
    const {url : path} = req
    if (verifyExcludedPaths(path)) return next()

    let token = req.headers['authorization']
    token = token ? token.slice(7,token.lenght) : null

    if(!token) return res.jsonUnauthorized(null,'Invalid token')

    try{
        const decoded = verifyJwt(token)
        req.accountId = decoded.id
        next()
    } catch{
        res.jsonUnauthorized(null,'Invalid token')
    }
}

const verifyExcludedPaths = path => {
    const excluedPaths = ['/auth/sign-in','/aut/sign-up']
    const isExcluded = !!excluedPaths.find(excluded=>excluded.startsWith(path))

    if (isExcluded) return true
}

module.exports = checkJwt