export const PORT: number = parseInt(process.env.PORT) || 7000,
    SECRET_TOKEN: string = "tokensecret",
    SALT_FACTOR: number = 10,
    //You can modify this for change database's name. 
    DBNANME: string = 'nameless',
    //You can modify this constants with your mongo user credentials.  
    mongoUser: string = 'admin',
    mongoPass: string = '123456', MONGODB_URI: string = process.env.MONGODB_URI || `mongodb://${mongoUser}:${mongoPass}@localhost:27017/${DBNANME}?authSource=admin` 