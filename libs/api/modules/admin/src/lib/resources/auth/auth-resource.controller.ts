import { Controller, Logger, Post } from "@nestjs/common";
import { AuthResourceService } from "./auth-resource.service";

@Controller('auth')
export class AuthResourceController {
    private logger = new Logger(AuthResourceController.name);

    constructor(private readonly authResourceService: AuthResourceService) {}

    @Post('register')
    async register(){
        return await this.authResourceService.register()
    }

    @Post('login')
    async login(){
        return await this.authResourceService.login()
    }
}