import { Injectable } from '@nestjs/common';
import { CreateInstaStoryDto } from './dto/create-insta-story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstaStory } from './entities/insta-story.entity';
import { InstaHashtag } from './entities/insta-hashtag.entity';
import { Repository } from 'typeorm';
import { StoryMapper } from './mapper/insta-story.mapper';
import { HashtagMapper } from './mapper/insta-hashtag.mapper';
import { InstaStoryRepository } from './insta-story.repository';
import { PaginationDto } from './dto/pagination.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class InstaStoryService {
  constructor(
    private readonly instaStoryRepository: InstaStoryRepository,
    @InjectRepository(InstaHashtag)
    private readonly instaHashtagRepository: Repository<InstaHashtag>,
  ) {}

  @Transactional()
  async createStory(createInstaStoryDto: CreateInstaStoryDto) {
    const story = StoryMapper.toInstaStory(createInstaStoryDto);
    const savedStory = await this.instaStoryRepository.saveStory(story);
    if (createInstaStoryDto.hashtags.length !== 1) {
      await this.saveUniqueHashtags(createInstaStoryDto, savedStory);
    }

    const getStory = await this.instaStoryRepository.findStory(savedStory.id);
    return StoryMapper.toCreateResponse(getStory);
  }

  private async saveUniqueHashtags(createInstaStoryDto: CreateInstaStoryDto, savedStory: InstaStory) {
    const uniqueHashtags = new Array<string>();
    createInstaStoryDto.hashtags.forEach((hashtage) => {
      if (!uniqueHashtags.includes(hashtage)) {
        uniqueHashtags.push(hashtage);
      }
    });
    const instaHashtags: InstaHashtag[] = HashtagMapper.toInstaHashtags(uniqueHashtags, savedStory);
    await this.instaHashtagRepository.save(instaHashtags);
    return uniqueHashtags;
  }

  async getStoryByPagination(paginate: PaginationDto) {
    return await this.instaStoryRepository.findInstaStoriesByPagination(paginate);
  }
}
