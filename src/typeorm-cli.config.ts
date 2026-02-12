import { DataSource } from "typeorm";
import { CoffeeRefactor1770870385853 } from "./migrations/1770870385853-CoffeeRefactor";
import { Coffee } from "./coffees/entities/coffee.entity";
import { Flavor } from "./coffees/entities/flavor.entity";

export default new  DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Coffee, Flavor],
    migrations: [CoffeeRefactor1770870385853],
})