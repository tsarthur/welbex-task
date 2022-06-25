import {
  Body,
  Controller,
  UploadedFile,
  UseGuards,
  Post,
  UseInterceptors,
  Get,
  Delete,
  Put,
} from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostsService } from "../services/posts.service";
import { UserPosts } from "../entities/posts.entities";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/modules/administrations/entities/user.entity";
import { DeletePostDto } from "../dto/delete-post.DTO";
import { EditUserPostDto } from "../dto/edit-post.DTO";

@ApiTags("Посты")
@Controller("posts")
export class PostsQueryController {
  constructor(private postService: PostsService) { }

  @ApiOperation({ summary: "Получить все посты" })
  @ApiResponse({ status: 200, type: [UserPosts] })
  @Get()
  getAll() {
    return this.postService.getAllPost();
  }

  @ApiOperation({ summary: "Создание поста" })
  @ApiResponse({ status: 200, type: UserPosts })
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() userDto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(userDto, image);
  }

  @ApiOperation({ summary: "Редактирование поста" })
  @ApiResponse({ status: 200, type: UserPosts })
  @Put()
  @UseInterceptors(FileInterceptor("image"))
  put(@Body() userDto: EditUserPostDto, @UploadedFile() image) {
    console.log("--0--------")
    return this.postService.editUserPost(userDto, image);
  }

  @ApiOperation({ summary: "Удалить пост" })
  @ApiResponse({ status: 200, type: UserPosts })
  @Delete()
  delete(@Body() userDto: DeletePostDto) {
    return this.postService.deletePost(userDto);
  }
}
