import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../administrations/entities/user.entity";

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: "posts" })
export class UserPosts extends Model<UserPosts, PostCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Глобальное потепление?", description: "Заголовок" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: "Еще в 1995 году..", description: "Описание" })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: "Фотография", description: "Jpg" })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: "Автор записи", description: "artur1234" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User) // один пользователь может иметь многим постов;
  author: User;
}
