import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/modules/administrations/entities/user.entity";
import { CreateUserDto } from "../../administrations/dto/create-user.DTO";
import { AuthService } from "../services/auth.service";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthQueryController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Post("/login")
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Post("/registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
