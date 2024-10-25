import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InstaStory } from './insta-story.entity';

@Entity()
export class InstaHashtag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tagName: string;
  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => InstaStory, (instaStory) => instaStory.instaHashtags, {
    onDelete: 'CASCADE',
  })
  instaStory: InstaStory;
}
