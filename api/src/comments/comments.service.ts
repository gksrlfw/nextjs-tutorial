import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>){}

    findByArticleSlug(slug: string) {
        return this.commentRepository.find({ where: { 'article.slug': slug }, relations: ['article']});
    }

    findById() {
        
    }

    createComment() {}

    deleteComment() {}
}
