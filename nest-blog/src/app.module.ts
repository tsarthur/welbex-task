import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./modules/administrations/administrations.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./modules/administrations/entities/user.entity";
import { AuthModule } from "./modules/authentication/authorizations.module";
import { PostsModule } from "./modules/publishs/publishs.module";
import { UserPosts } from "./modules/publishs/entities/posts.entities";
import { FilesModule } from "./modules/files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, UserPosts],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule { }
