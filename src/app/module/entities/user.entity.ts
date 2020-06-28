import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    @IsDefined()
    email: string;

    @Column()
    @IsDefined()
    username: string;

    @Column({ default: null })
    password: string;

    @Column()
    @IsDefined()
    passwordHash: string | undefined;
}
