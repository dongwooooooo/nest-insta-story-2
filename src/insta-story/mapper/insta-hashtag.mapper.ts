import { InstaHashtag } from '../entities/insta-hashtag.entity';
import { InstaStory } from '../entities/insta-story.entity';

export class HashtagMapper {
  static toInstaHashtag(hashtag: string, instaStory: InstaStory) {
    const instaHashtag = new InstaHashtag();
    instaHashtag.tagName = hashtag;
    instaHashtag.instaStory = instaStory;
    return instaHashtag;
  }
  static toInstaHashtags(hashtags: string[], instaStory: InstaStory): InstaHashtag[] {
    return hashtags.map((hashtag): InstaHashtag => HashtagMapper.toInstaHashtag(hashtag, instaStory));
  }
}
