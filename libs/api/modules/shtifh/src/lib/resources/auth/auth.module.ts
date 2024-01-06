import { Module } from "@nestjs/common";
import { PrismaModule } from "@shtifh/prisma-service";
import { AuthShtifhService } from "./auth.service";
import { AuthShtifhController } from "./auth.controller";

@Module({
    imports: [PrismaModule],
    providers: [AuthShtifhService],
    exports: [AuthShtifhService, AuthShtifhController]
})
export class AuthShtifhModule {}