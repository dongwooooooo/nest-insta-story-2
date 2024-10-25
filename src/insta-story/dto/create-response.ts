import { InstaHashtag } from '../entities/insta-hashtag.entity';

export class CreateResponse {
  id: number;
  title: string;
  createAt: Date;
  validTime: string;
  author: string;
  image: string;
  hashtags: InstaHashtag[];
}
