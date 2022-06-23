import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'ec2-3-224-8-189.compute-1.amazonaws.com',
    port : 5432,
    username : 'tdzwweibccnjmr',
    password : '6b342f95db4ebc5eced5b50e88208af3e20f105d860ac1c6c1a5a5e667f9e544',
    database : 'd3qdmlqtu1viu5',
    ssl: {
        rejectUnauthorized: false,
    },
    entities : [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize : true
}