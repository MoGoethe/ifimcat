import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./entity/tag.entity";
import { 
  GetTagsResolver,
  CreateTagResolver,
  UpdateTagResolver,
  DeleteTagResolver,
} from "./resolvers";

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [
    TagService,
    GetTagsResolver,
    CreateTagResolver,
    UpdateTagResolver,
    DeleteTagResolver,
  ],
})
export class TagModule{}