import { forwardRef, Module } from "@nestjs/common";
import { AuthQueryController } from "./controllers/auth-query.controller";
import { AuthService } from "./services/auth.service";
import { UsersModule } from "../administrations/administrations.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthQueryController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule { }
