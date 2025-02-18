import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class UserXEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  filePath: string; // Store file path

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  born_date: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  join_date: Date;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;
}
