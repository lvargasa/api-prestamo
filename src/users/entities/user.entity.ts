import { Exclude } from 'class-transformer'
import { Client } from 'src/clients/entities/client.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Exclude()
  @Column()
  password: string

  @Column({ nullable: true })
  alias: string

  @Column({ nullable: true })
  phone: string

  @Column({ default: true })
  active: boolean

  @OneToMany(() => Client, client => client.user)
  clients: Client[]
}
