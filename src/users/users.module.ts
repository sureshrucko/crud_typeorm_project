import { Module } from '@nestjs/common';
import { UersService } from './uers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { UersController } from './uers.controller';
import { UserProfile } from 'src/typeorm/entities/profile';
import { Post } from 'src/typeorm/entities/post';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, UserProfile, Post
  ])],
  controllers: [UersController],
  providers: [UersService]
})
export class UsersModule {}
