import {Controller, Body, Post, Headers, Get} from '@nestjs/common'
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    login(@Body() payLoad: LoginDto){
        try{
            return this.authService.login(payLoad);
        } catch(error){
            throw new Error(error as string);
        }
    }

    @Get('check')
    chack(@Headers() headers: Record<string, string>){
        try{
            return this.authService.check(headers);
        } catch(error){
            throw new Error(error as string);
        }
    }

    @Get('refresh')
    refresh(@Headers() headers: Record<string, string>){
        try{
            return this.authService.refresh(headers);
        } catch(error){
            throw new Error(error as string);
        }
    }
}