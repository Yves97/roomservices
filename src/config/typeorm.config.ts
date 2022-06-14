import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig : TypeOrmModuleOptions = {
    type : 'mysql',
    host : 'us-cdbr-east-05.cleardb.net',
    port : 3306,
    username : 'bfd3217237646b',
    password : '14f2a4f7',
    database : 'heroku_ade000ed014327b',
    entities : [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize : true,
    url: 'mysql://bfd3217237646b:14f2a4f7@us-cdbr-east-05.cleardb.net/heroku_ade000ed014327b?reconnect=true',
    ssl: { rejectUnauthorized: false }
}