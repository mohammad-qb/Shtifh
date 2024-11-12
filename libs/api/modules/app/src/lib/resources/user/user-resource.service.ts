import { Injectable, Logger } from "@nestjs/common";
import { AuthService } from "@shtifh/auth-service";
import { LoginInput } from "./dtos/login.dto";
import { HeaderLanguage } from "@shtifh/decorators";

@Injectable()
export class UserResourceService {
  private logger = new Logger(UserResourceService.name);

  constructor(private readonly authService: AuthService) {}

 async login(input: LoginInput, lang: HeaderLanguage) {
    return await this.authService.login(input.email, input.password, lang);
  }

 async me(userId: string, lang: HeaderLanguage){
  return await this.authService.me(userId, lang);
 }

}
