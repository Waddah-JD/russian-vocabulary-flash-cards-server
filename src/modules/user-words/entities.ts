import { User } from '@modules/users/entities';
import { Word } from '@modules/words/entities';
import { DeletableEntity } from 'src/database/extendableEntities';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'users_words' })
@Unique('user_id_word_id', ['user', 'word'])
export class UsersWords extends DeletableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Word, { eager: true })
  word: Word;

  @Column({ type: 'timestamp', nullable: true })
  @Index()
  lastShownToUserAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  @Index()
  addedToCollectionAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  @Index()
  lastPracticedAt: Date | null;

  @Column({ type: 'int', nullable: true })
  @Index()
  successfulPracticeCount: number | null;

  @Column({ type: 'int', nullable: true })
  @Index()
  failedPracticeCount: number | null;

  @Column({ type: 'varchar', nullable: true })
  notes: string | null;
}
