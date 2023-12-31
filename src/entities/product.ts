import { Entity , PrimaryGeneratedColumn , Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity('product')
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    color:string;

    @Column()
    size:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => User,(user)=>user.products)
    user:User
}