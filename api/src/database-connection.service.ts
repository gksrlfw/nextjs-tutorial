import { Injectable } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

/*

    Options for database. needs to connect with app.module.ts like below
    
    imports: [UserModule, TypeOrmModule.forRootAsync({
        useClass: DatabaseConnectionService
    })],

*/
@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            //name: 'defualt',
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            synchronize: true,
            dropSchema: false,
            logging: true,
            entities: ['dist/**/*.entity.js']
        }
    }
}
