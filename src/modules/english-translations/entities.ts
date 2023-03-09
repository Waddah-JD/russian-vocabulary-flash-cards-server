import { Word } from '@modules/words/entities';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'english_translations' })
export class EnglishTranslation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 250, unique: true })
  @Index()
  translation: string;

  @ManyToMany(() => Word, (word) => word.englishTranslations, {
    onDelete: 'CASCADE',
  })
  words: Word[];
}
