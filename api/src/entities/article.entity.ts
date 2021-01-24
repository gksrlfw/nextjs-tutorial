import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import * as slugify from 'slug';
import { UserEntity } from "./user.entity";
import { classToPlain } from "class-transformer";


@Entity('articles')
export class ArticleEntity extends AbstractEntity {
    @Column()
    slug: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    body: string;

    @Column({ default: 0 })
    favoritesCount: number;

    @Column('simple-array')
    tagList: string[];

    // TODO: eager
    // When article loaded, author also loaded auto.
    @ManyToOne(type => UserEntity, user => user.articles, { eager: true })
    author: UserEntity;

    @ManyToMany(type => UserEntity, user => user.favorites, { eager: true })
    @JoinTable({ name: 'favorited' })
    favoritedBy: UserEntity[];

    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }

    toJSON() {
        return classToPlain(this);
    }

    toArticle(user?: UserEntity) {
        let favorited = null;
        // if(user) favorited = this.favoritedBy.includes(user);
        if(user) favorited = this.favoritedBy.map(user => user.id).includes(user.id);
        const article: any = this.toJSON();
        delete article.favoritedBy;
        return { ...article, favorited };
    }
}