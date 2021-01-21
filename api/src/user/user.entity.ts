import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    email: string;

    @Column('varchar')
    username: string;

    @Column('varchar')
    password: string;
}