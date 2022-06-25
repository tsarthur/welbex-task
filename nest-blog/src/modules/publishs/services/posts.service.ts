import { Body, Injectable, UseGuards } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserPosts } from "../entities/posts.entities";
import { FilesService } from "../../files/files.service";
import { UsersModule } from "src/modules/administrations/administrations.module";
import { PostsModule } from "../publishs.module";
import { DeletePostDto } from "../dto/delete-post.DTO";
import { EditUserPostDto } from "../dto/edit-post.DTO";
// import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
// import { DATE } from "sequelize";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(UserPosts) private postRepository: typeof UserPosts,
    private fileService: FilesService,
  ) { }

  async create(dto: CreatePostDto, image: any) {
    console.log("-k---------");
    console.log(image);
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ image: fileName, ...dto });
    return post;
  }

  async editUserPost(input: EditUserPostDto, image: any) {
    console.log("-e---------");
    console.log(image);
    const fileName = await this.fileService.createFile(image);
    const { id, title, content } = input;

    const existingUser = await this.postRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      console.log(`Пользователь ${id} не найден!`);
    }

    await this.postRepository.update(
      {
        title: title,
        content: content,
        // image: fileName, ...input,
      },
      {
        where: {
          id,
        },
      },
    );
    return true;
  }

  async deletePost(input: DeletePostDto) {
    const { id } = input;
    const existingUserPost = await this.postRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUserPost) {
      console.log(`Пост ${id} не найден!`);
    }

    await this.postRepository.destroy({
      where: {
        id,
      },
    });

    return true;
  }

  async getAllPost() {
    const users = await this.postRepository.findAll({
      include: {
        all: true,
      },
    });
    return users;
  }

  // async getOnePost(id: number) {
  //   const users = await this.postRepository.findOne({ include: { all: true }});
  //   return users; 
  // }


}
