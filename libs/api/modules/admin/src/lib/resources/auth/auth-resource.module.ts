import { Module } from "@nestjs/common";
import { PrismaModule } from "@shtifh/prisma-service";
import { AuthResourceService } from "./auth-resource.service";

@Module({
    imports: [PrismaModule],
    providers: [AuthResourceService],
    exports: [AuthResourceModule]
})
export class AuthResourceModule {}