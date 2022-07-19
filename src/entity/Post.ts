import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    constructor(title: string, description: string, user: any) {
        this.title = title;
        this.description = description;
        this.user = user;
      }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({nullable: true})
  photo: string

  @ManyToOne(() => User, (user) => user.posts)
    user: User
}
