import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InstaHashtag } from './insta-hashtag.entity';

@Entity()
export class InstaStory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  author: string;
  @Column({ length: 100 })
  title: string;
  @Column({ length: 500 })
  image: string;
  @Column()
  validTime: string;
  @CreateDateColumn()
  createAt: Date;
  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @OneToMany(() => InstaHashtag, (instaHashtag) => instaHashtag.instaStory, {
    cascade: true,
  })
  instaHashtags: InstaHashtag[];
}
