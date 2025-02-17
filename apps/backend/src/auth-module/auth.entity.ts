import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class UserXEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @Column()
  full_name: string;

  @Column()
  born_date: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  join_date: Date;

  @Column()
  email: string;

  @Column()
  password: string;
}
