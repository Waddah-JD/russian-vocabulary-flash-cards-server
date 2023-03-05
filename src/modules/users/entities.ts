import { UsersWords } from '@modules/user-words/entities';
import { DeletableEntity } from 'src/database/extendableEntities';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends DeletableEntity {
  @PrimaryColumn('varchar')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  lastSignIn: Date | null;

  @OneToMany(() => UsersWords, (userWords) => userWords.user)
  userWords: UsersWords[];
}
