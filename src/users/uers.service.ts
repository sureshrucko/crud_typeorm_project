import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, UserPostDto, UserProfileDto } from 'src/dtos/userDetail.dto';
import { Post } from 'src/typeorm/entities/post';
import { UserProfile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
        @InjectRepository(Post) private userPostRepository: Repository<Post>
    ){}

    getUsers() {
        try { 
            return this.userRepository.find({relations: ['profile','posts']})
        } catch (err) {
            throw(err);
        }
    }

    createUser(userDetail: CreateUserDto) {
        try {
            const newUser = this.userRepository.create({
                ...userDetail,
                createdAt: new Date(),
            });
            this.userRepository.save(newUser);
            return null;
        } catch (err) {
            throw(err);
        }
        
        
    }

    updateUser(id:number, userDetail: UpdateUserDto) {
        try {
            this.userRepository.update({ id },{ 
                password: userDetail.password,
                emailId: userDetail.emailId
            })
            return null;
        } catch(err) {
            throw(err);
        }
    }

    deleteUser(id: number) {
        try {
            this.userRepository.delete({id});
            return null;
        } catch (err) {
            throw(err);
        }
    }

    async createUserProfile(id:number , payload:UserProfileDto) {
        try {
            const user = await this.userRepository.findOneBy({id})
            if(!user) {
                throw new HttpException('User not found, can not create profile',HttpStatus.BAD_REQUEST)
            }
            const data = this.userProfileRepository.create(payload);
            const savedProfile = await this.userProfileRepository.save(data);
            user.profile = savedProfile;
            return this.userRepository.save(user);
        } catch(err) {
            throw (err)
        }
    }

    async createUserPost(id:number , payload:UserPostDto)  {
        try {
            const user = await this.userRepository.findOneBy({id})
            if(!user) {
                throw new HttpException('User not found, can not post',HttpStatus.BAD_REQUEST)
            }
            const newpost = this.userPostRepository.create({
                ...payload,
                user
            });
            return await this.userPostRepository.save(newpost);
        }catch(err) {
            throw (err)
        }
    }
}
