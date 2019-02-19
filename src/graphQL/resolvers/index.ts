import IndexResolvers from "./index.resolver";

const merge = require('lodash.merge');



export default merge(
    IndexResolvers,
    {
        User: {
            __resolveType(obj: any, ctx: any, info: any) {
                switch (obj.role) {
                    case 'driver':
                        return 'Driver';
                    case 'parkinglotprovider':
                        return 'ParkingLotProvider'
                }
            }
        }
    }

)