import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'word_types' })
export class WordType {
  @PrimaryColumn('int')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  type: string;
}
