import { Client } from 'src/clients/entities/client.entity'
import { Payment } from 'src/payments/entities/payment.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ammount: number

    @Column()
    rate: number

    @Column()
    total: number

    @Column()
    debt: number

    @Column({ type: 'date', default: () => 'now()' })
    createdAt: string

    @Column('decimal')
    share: number

    @Column()
    days: number

    @ManyToOne(() => Client, client => client.loans)
    @JoinColumn({ name: 'clientId' })
    client: Client

    @Column()
    clientId: number

    @OneToMany(() => Payment, payment => payment.loan)
    payments: Payment[]
}
