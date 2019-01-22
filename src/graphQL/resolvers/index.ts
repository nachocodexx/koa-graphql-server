import IndexResolvers from "./index.resolver";
import userResolver from "./user.resolver";

const merge = require('lodash.merge');



export default merge(
    IndexResolvers,
    userResolver

)