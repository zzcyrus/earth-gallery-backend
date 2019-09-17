import * as _ from 'lodash'
import common from './common'

const env = process.env.EXPORT_ENV || 'development'
const config = require(`./${env}`)

export default _.merge(common, config, { env })
