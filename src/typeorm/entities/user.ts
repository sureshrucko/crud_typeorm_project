import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "./profile";
import { Post } from "./post";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    emailId: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(()=> UserProfile)
    @JoinColumn()
    profile: UserProfile

    @OneToMany(()=> Post, (post)=> post.user)
    posts: Post[];
  }