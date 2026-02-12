
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;
    
    @JoinTable()
    @ManyToMany(type => Flavor, flavor => flavor.coffees, {
        cascade: true, // allows us to insert a new flavor when we insert a new coffee
    })
    flavors: Flavor[];
}