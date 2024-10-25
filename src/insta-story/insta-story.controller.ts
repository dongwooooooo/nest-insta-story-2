import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { InstaStoryService } from './insta-story.service';
import { CreateInstaStoryDto } from './dto/create-insta-story.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';

@Controller('insta-story')
export class InstaStoryController {
  constructor(private readonly instaStoryService: InstaStoryService) {}

  @Post('/stories')
  @ApiOperation({ summary: '인스타 스토리 생성' })
  @ApiBody({ type: CreateInstaStoryDto })
  @HttpCode(201)
  async createStory(@Body() createInstaStoryDto: CreateInstaStoryDto) {
    return await this.instaStoryService.createStory(createInstaStoryDto);
  }

  @Get('/stories')
  @ApiOperation({ summary: '인스타 스토리들 조회' })
  @HttpCode(200)
  @ApiQuery({ name: 'page', type: Number, required: false, description: '페이지 번호' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: '페이지당 항목 수' })
  async findStories(@Query() paginate: PaginationDto) {
    return await this.instaStoryService.getStoryByPagination(paginate);
  }
}
