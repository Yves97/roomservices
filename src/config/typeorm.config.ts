import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig : TypeOrmModuleOptions = {
    type : 'mysql',
    host : 'us-cdbr-east-05.cleardb.net',
    port : 3306,
    username : 'bfd3217237646b',
    password : '14f2a4f7',
    database : 'heroku_ade000ed014327b',
    entities : [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize : true
}