const AccessService = require('../services/access.service')

class AccessController {

    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body)
            // 201: CREATED
            const response = await AccessService.signUp(req.body)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController()