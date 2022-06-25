import { forwardRef, Module } from "@nestjs/common";
import { UserQueryController } from "./controllers/user-query.controller";
import { UsersService } from "./services/users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { AuthModule } from "../authentication/authorizations.module";
import { UserPosts } from "../publishs/entities/posts.entities";

@Module({
  controllers: [UserQueryController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UserPosts]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
