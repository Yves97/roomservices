import { Body, 
    Controller, 
    Get, 
    NotFoundException, 
    Param, 
    Patch, 
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthServices } from './auth.services';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



@Controller('auth')
export class AuthController {
    constructor(private authServices : AuthServices){}
    @Post('/register')
    async createUser(@Body(ValidationPipe) createUserDto : CreateUserDto):Promise<{}>{
        const create = await this.authServices.createUser(createUserDto)
        if(create){
            create.password = undefined
            create.salt = undefined
            return {
                message : 'Utilisateur enregistré avec success',
                user : create,
            }   
        }
    }

    @Get('user/:id')
    @UseGuards(AuthGuard())
    async getUser(@Param('id') id : number){
        return await this.authServices.getUser(id)
    }

    @Post('/login')
    async loginUser(@Body() user : CreateUserDto):Promise<{accessToken:string}>{
        const result = await this.authServices.loginUser(user)
        return result;
    }

    @Patch('/user/update/:id')
    @UseGuards(AuthGuard())
    async updateProfile(@Param('id') id:number,@Body(ValidationPipe) user : UpdateUserDto):Promise<void>{
        return await this.authServices.updateProfile(id,user)
    }

    // @Post('/update/password/:id')
    // @UseGuards(AuthGuard())
    // async updatePassword(@GetUser() user:Auth,@Body(ValidationPipe) credentials:UpdatePasswordDto){
    //     return await this.authServices.updatePassword(user,credentials)
    // }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user : Auth){
    //     console.log(user)
    // }

}
