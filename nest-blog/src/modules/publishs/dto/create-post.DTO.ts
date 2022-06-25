import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ example: "Глобальное потепление?", description: "Заголовок" })
  @IsString({ message: "Должно быть строкой" })
  @Length(5, 20, { message: "Не меньше 10 и не больше 40" })
  readonly title: string;
  @ApiProperty({ example: "Еще в 1995 году..", description: "Описание" })
  @IsString({ message: "Должно быть строкой" })
  @Length(20, 120, { message: "Не меньше 20 и не больше 120" })
  readonly content: string;
  @ApiProperty({ example: "Автор записи", description: "artur1234" })
  readonly userId: number;
}
