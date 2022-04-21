import { Body, Controller, Get, NotFoundException, Param, Post, ValidationPipe } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthServices } from './auth.services';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authServices : AuthServices){}


    @Post('/register')
    async createUser(@Body(ValidationPipe) createUserDto : CreateUserDto):Promise<Auth>{
        return await this.authServices.createUser(createUserDto)
    }

    @Get('user/:id')
    async getUser(@Param('id') id : number){
        console.log(id)
        const user = await this.authServices.getUser(id)
        if(!user){
            throw  new NotFoundException('Utilisateur non trouvable')
        }else{
            return user;
        }
    }

    @Post('/login')
    async loginUser(@Body() user : CreateUserDto){
        const result = await this.authServices.validateUserPassword(user)
        console.log(result)
    }


}
