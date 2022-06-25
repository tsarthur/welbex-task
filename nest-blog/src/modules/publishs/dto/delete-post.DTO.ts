import { ApiProperty } from "@nestjs/swagger";

export class DeletePostDto {
  @ApiProperty({ example: "1", description: "Уникальное значение" })
  readonly id: number;
}
