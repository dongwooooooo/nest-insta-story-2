import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { IsHashtag, IsStoryValidTime, IsStringWithLen } from 'src/common/util/decoration-config';

export class CreateInstaStoryDto {
  @ApiProperty({ example: 'title', description: 'title' })
  @IsStringWithLen(1, 100)
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'author', description: 'author' })
  @IsStringWithLen(1, 50)
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 'image', description: 'image' })
  @IsStringWithLen(1, 500)
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: '24', description: 'validTime' })
  @IsStoryValidTime()
  @IsNotEmpty()
  validTime: string;

  @ApiProperty({ example: ['#hashtag1', '#hashtag2'], description: 'hashtags' })
  @IsHashtag()
  hashtags: string[];
}
