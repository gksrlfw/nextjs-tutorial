import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


// want to use like second one. (do not want to insert directly string in class)
// @UseGuards(AuthGuard('local'))  
// @UseGuards(LocalAuthGuard)        
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}