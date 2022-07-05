import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    constructor(email: string, password: string){
        this.email = email;
        this.password = password
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    sex: string 
    
    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    birth: string

    @Column({nullable: true})
    number: string

}
