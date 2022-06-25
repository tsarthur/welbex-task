import { Module } from "@nestjs/common";
import { PostsService } from "./services/posts.service";
import { PostsQueryController } from "./controllers/post-query.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../administrations/entities/user.entity";
import { UserPosts } from "./entities/posts.entities";
import { FilesModule } from "../files/files.module";

@Module({
  providers: [PostsService],
  controllers: [PostsQueryController],
  imports: [SequelizeModule.forFeature([User, UserPosts]), FilesModule],
})
export class PostsModule { }
