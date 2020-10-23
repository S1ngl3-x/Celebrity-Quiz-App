import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Quiz {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public result?: number;
}

export default Quiz;
