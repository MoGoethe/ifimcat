import { Module } from "@nestjs/common";
import { TopicController } from "./topic.controller";
import { TopicService } from "./topic.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Topic } from "./entity/topic.entity";
import { 
  GetTopicsResolver,
  CreateTopicResolver,
  UpdateTopicResolver,
  DeleteTopicResolver,
} from "./resolvers";

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [TopicController],
  providers: [
    TopicService,
    GetTopicsResolver,
    CreateTopicResolver,
    UpdateTopicResolver,
    DeleteTopicResolver,
  ],
})
export class TopicModule{}