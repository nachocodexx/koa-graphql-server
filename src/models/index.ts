import * as mongoose from 'mongoose'
import { MONGODB_URI } from '../config';

//DeprecationWarning: collection.ensureIndex is deprecated.Use createIndexes instead.
mongoose.set('useCreateIndex', true);


export function connect(): Promise<any> {

    const options: mongoose.ConnectionOptionsBase = {
        useNewUrlParser: true
    }
    return mongoose.connect(MONGODB_URI, options)
}

export function disconnect(): void {
    mongoose.disconnect()
}