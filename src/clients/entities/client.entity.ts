import { Loan } from 'src/loans/entities/loan.entity'
import { User } from 'src/users/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    dni: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    address: string

    @Column({ nullable: true })
    ocupation: string

    @ManyToOne(() => User, user => user.clients)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ nullable: true })
    userId: number

    @OneToMany(() => Loan, loan => loan.client)
    loans: Loan[]
}
