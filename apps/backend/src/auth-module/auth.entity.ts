import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserXEntity {
  @PrimaryGeneratedColumn()
  id: string;

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
