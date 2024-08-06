import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserPostDto, UserProfileDto } from 'src/dtos/userDetail.dto';
import { UersService } from 'src/users/uers.service';

@Controller('user')
export class UersController {
    constructor(private userService: UersService) {}
    @Get()
    async getUsers() { 
        return await this.userService.getUsers();
    }

    @Post() 
    createUser(@Body() payload: CreateUserDto) {
        return this.userService.createUser(payload);
    }

    @Put(`:id`)
    async updateUserById(@Param('id', ParseIntPipe) id: number,@Body() payload:UpdateUserDto) {
        return await this.userService.updateUser(id,payload)
    }

    @Delete(`:id`) 
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.deleteUser(id);
    }  

    @Post(`:id/profiles`)
    createUserProfile(@Param('id', ParseIntPipe) id: number,@Body() payload:UserProfileDto ) {
        return this.userService.createUserProfile(id,payload);
    }

    @Post(`:id/posts`)
    createUserPost(@Param('id', ParseIntPipe) id: number,@Body() payload:UserPostDto ) {
        return this.userService.createUserPost(id,payload);
    }
}
