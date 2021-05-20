import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import Role from './role'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: null })
  name: string

  @Column({ default: null })
  email: string

  @Column({ default: null })
  password: string

  @ManyToOne(() => Role, role => role.user_owner, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role

  @Column({ type: 'uuid', default: null, nullable: true })
  role_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date

  @Column({ nullable: true })
  access_token: string
}

export default User
