import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { ArticleEntity } from "./article.entity";

@Entity('comments')
export class CommentEntity extends AbstractEntity {
    @Column()
    body: string;

    @ManyToOne(type => ArticleEntity, article => article.comments)
    article: string;
}