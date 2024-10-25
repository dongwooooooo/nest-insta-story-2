import { Repository } from 'typeorm';
import { InstaStory } from './entities/insta-story.entity';
import { PaginationDto } from './dto/pagination.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstaStoryRepository {
  constructor(
    @InjectRepository(InstaStory)
    private readonly instaStoryRepository: Repository<InstaStory>,
  ) {}
  public async saveStory(instaStory: InstaStory) {
    return this.instaStoryRepository.save(instaStory);
  }
  public async findStory(storyId: number) {
    return this.instaStoryRepository.findOne({
      where: { id: storyId },
      relations: ['instaHashtags'],
    });
  }
  public async findInstaStoriesByPagination(query: PaginationDto): Promise<InstaStory[]> {
    const queryBuilder = this.instaStoryRepository
      .createQueryBuilder('instaStory')
      .leftJoinAndSelect('instaStory.instaHashtags', 'instaHashtag')
      .where('instaStory.expiresAt > :current', { current: new Date() })
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('instaStory.createAt', query.order);

    return await queryBuilder.getMany();
  }
}
