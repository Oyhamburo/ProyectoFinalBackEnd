const { Router } = require("express");
import {DATE_UTILS} from '../../utils/date-utils.js'

const router = Router()

router.post('/',async (req, res ) =>{
    const cart = {timestamp: DATE_UTILS.getTimestamp(), products: []}
})

export {router as CartRouter}