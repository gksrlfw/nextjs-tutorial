import { classToPlain, Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { IsEmail } from "class-validator";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { ArticleEntity } from "./article.entity";
import { CommentsService } from "src/comments/comments.service";
import { CommentEntity } from "./comment.entity";
import { cpuUsage } from "process";

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

    // Follow: many to many
    @ManyToMany(type => UserEntity, user => user.followee)
    @JoinTable({ name: 'following' })
    followers: UserEntity[];

    @ManyToMany(type => UserEntity, user => user.followers)
    followee: UserEntity[];

    @OneToMany(type => ArticleEntity, article => article.author)
    articles: ArticleEntity[];

    @ManyToMany(type => ArticleEntity, article => article.favoritedBy)
    @JoinTable({ name: 'favorited' })
    favorites: ArticleEntity[];

    

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

    toProfile(user?: UserEntity) {
        let following = null;
        if(user) following = this.followers.includes(user);
        const profile: any = this.toJSON();
        delete profile.followers;
        return { ...profile, following };
    }
}