import { FindFeedQuery } from "./findFeedQuery.interface";

export interface FindAllQuery extends FindFeedQuery {
    tag?: string;
    author?: string;
    favorited?: string;
}