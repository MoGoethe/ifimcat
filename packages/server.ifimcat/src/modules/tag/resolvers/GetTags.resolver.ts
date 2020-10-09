import { 
  Resolver,
  Query,
  Args
} from "@nestjs/graphql";
import { TagService } from "../tag.service";
import { Tag } from "../entity/tag.entity";

@Resolver()
export class GetTagsResolver {
  constructor(private readonly tagService: TagService){}

  @Query(() => [Tag], {nullable: 'itemsAndList'})
  async getTags() {
    return this.tagService.getTags();
  }

  @Query(() => Tag)
  async getTag(@Args('key') key: string) {
    return this.tagService.getTagByKey(key);
  }
}