import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/auth-jwt.guard';
import { CreateArticleDTO } from 'src/models/article/create.dto';
import { FindAllQuery } from 'src/models/article/findAllQuery.interface';
import { FindFeedQuery } from 'src/models/article/findFeedQuery.interface';
import { UpdateArticleDTO } from 'src/models/article/update.dto';
import { UpdateUserDTO } from 'src/models/auth/update.dto';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@User() user: UserEntity, @Query() query: FindAllQuery) {
        const articles = await this.articleService.findAll(user, query);
        return { articles, articleCount: articles.length };
    }

    @Get('/feed')
    @UseGuards(JwtAuthGuard)
    async findFeed(@User() user: UserEntity, @Query() query: FindFeedQuery) {
        const articles = await this.articleService.findAll(user, query);
        return { articles, articlesCount: articles.length };
    }
    @Get('/:slug')
    @UseGuards(JwtAuthGuard)
    async findBySlug(@Param('slug') slug: string, @User() user: UserEntity) {
        const article = await this.articleService.findBySlug(slug);
        return { article: article.toArticle(user) };
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createArticle(@User() user: UserEntity, @Body() data: { article: CreateArticleDTO }) {
        const article = await this.articleService.createArticle(user, data.article);
        return { article };
    }

    @Put('/:slug')
    @UseGuards(JwtAuthGuard)
    async updateArticle(@Param('slug') slug: string, @User() user: UserEntity, @Body() data: { article: UpdateArticleDTO }) {
        const article = await this.articleService.updateArticle(slug, user, data.article);
        return { article };
    }

    @Delete('/:slug')
    @UseGuards(JwtAuthGuard)
    async deleteArticle(@Param('slug') slug: string, @User() user: UserEntity) {
        const article = await this.articleService.deleteArticle(slug, user);
        return { article };
    }

    @Post('/:slug/favorite')
    @UseGuards(JwtAuthGuard)
    async favoriteArticle(@User() user: UserEntity, @Param('slug') slug: string) {
        const article = await this.articleService.favoriteArticle(slug, user);
        return { article };
    }

    @Delete('/:slug/favorite')
    @UseGuards(JwtAuthGuard)
    async unfavoriteArticle(@User() user: UserEntity, @Param('slug') slug: string) {
        const article = await this.articleService.unfavoriteArticle(slug, user);
        return { article };
    }
}
