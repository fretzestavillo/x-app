import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfilePicEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  filePath: string; // Store file path
}
