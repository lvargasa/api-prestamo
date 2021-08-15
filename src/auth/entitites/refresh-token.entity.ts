import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column()
  is_revoked: boolean

  @Column()
  expires: Date
}
