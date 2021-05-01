import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn } from 'typeorm'

@Entity('errors')
class Error {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  error: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}

export default Error
