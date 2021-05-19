import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm'
import User from './user'

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  // eslint-disable-next-line @typescript-eslint/naming-convention
  @OneToMany(() => User, user_owner => user_owner.role)
  user_owner: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date
}

export default Role
