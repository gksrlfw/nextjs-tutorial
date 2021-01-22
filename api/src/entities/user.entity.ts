import { classToPlain, Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { IsEmail } from "class-validator";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";

/*
    Relations

*/



@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column()
    @IsEmail()
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()    // Search!
    password: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: null, nullable: true })
    image: string | null;

    // TODO: add following
    // Follow: many to many
    @ManyToMany(type => UserEntity, user => user.followee)
    @JoinTable()
    followers: UserEntity[];

    @ManyToMany(type => UserEntity, user => user.followers)
    followee: UserEntity[];

    // For encoding password
    // Do hashing before insert password
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);    
    }

    // Search what the function!
    toJSON() {
        return classToPlain(this);
    }

    toProfile(user: UserEntity) {
        const following = this.followers.includes(user);
        const profile = this.toJSON();
        delete profile.followers;
        return { ...profile, following };
    }
}