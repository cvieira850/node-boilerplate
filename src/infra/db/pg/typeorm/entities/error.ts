import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn } from 'typeorm'

@Entity('errors')
class Error {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: null })
  error: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date
}

export default Error
