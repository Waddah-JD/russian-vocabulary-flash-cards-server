import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;
}

export abstract class UpdatableEntity extends BaseEntity {
  @UpdateDateColumn()
  updatedAt: Date;
}

export abstract class DeletableEntity extends UpdatableEntity {
  @DeleteDateColumn()
  deletedAt: Date | null;
}

export abstract class NonUpdatableEntity extends BaseEntity {
  @DeleteDateColumn()
  deletedAt: Date | null;
}
