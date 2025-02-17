import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserXEntity } from '../auth-module/auth.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserXEntity, (user) => user.posts)
  user: UserXEntity;

  @Column({ type: 'text' })
  profilePic: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @CreateDateColumn()
  postDate: Date;

  @Column({ type: 'text' })
  postText: string;

  @Column({ type: 'text', nullable: true })
  postContent?: string;

  @Column({ type: 'int', default: 0 })
  messageCount: number;

  @Column({ type: 'int', default: 0 })
  repostCount: number;

  @Column({ type: 'int', default: 0 })
  heartCount: number;

  @Column({ type: 'int', default: 0 })
  viewsCount: number;
}
