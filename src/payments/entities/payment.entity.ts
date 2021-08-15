import { Loan } from 'src/loans/entities/loan.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ammount: number

    @Column({ type: 'date', default: () => 'now()' })
    createdAt: string

    @ManyToOne(() => Loan, loan => loan.payments)
    @JoinColumn({name : 'loanId'})
    loan: Loan

    @Column()
    loanId: number
}
