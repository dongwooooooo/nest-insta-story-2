import { CreateInstaStoryDto } from '../dto/create-insta-story.dto';
import { CreateResponse } from '../dto/create-response';
import { InstaStory } from '../entities/insta-story.entity';

export class StoryMapper {
  static toCreateResponse(story: InstaStory) {
    const response = new CreateResponse();
    response.id = story.id;
    response.title = story.title;
    response.createAt = story.createAt;
    response.validTime = story.validTime;
    response.author = story.author;
    response.image = story.image;
    response.hashtags = story.instaHashtags;
    return response;
  }
  static toCreateResponseArray(stories: InstaStory[]) {
    return stories.map((story) => this.toCreateResponse(story));
  }
  static toInstaStory(createInstaStoryDto: CreateInstaStoryDto) {
    const instaStory = new InstaStory();
    instaStory.author = createInstaStoryDto.author;
    instaStory.title = createInstaStoryDto.title;
    instaStory.image = createInstaStoryDto.image;
    instaStory.validTime = createInstaStoryDto.validTime;
    instaStory.expiresAt = new Date(Date.now() + parseInt(createInstaStoryDto.validTime) * 60 * 60 * 1000);
    return instaStory;
  }
}
