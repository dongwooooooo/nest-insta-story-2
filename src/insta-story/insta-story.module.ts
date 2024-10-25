import { Module } from '@nestjs/common';
import { InstaStoryService } from './insta-story.service';
import { InstaStoryController } from './insta-story.controller';
import { InstaStoryRepository } from './insta-story.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstaStory } from './entities/insta-story.entity';
import { InstaHashtag } from './entities/insta-hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstaStory, InstaHashtag])],
  controllers: [InstaStoryController],
  providers: [InstaStoryService, InstaStoryRepository],
  exports: [InstaStoryRepository],
})
export class InstaStoryModule {}
