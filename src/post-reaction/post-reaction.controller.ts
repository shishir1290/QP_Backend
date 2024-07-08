import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PostReactionService } from './post-reaction.service';
import { CreatePostReactionDto } from './dto/create-post-reaction.dto';
import { PostReaction } from './entities/post-reaction.entity';

@Controller('api')
export class PostReactionController {
  constructor(private readonly postReactionService: PostReactionService) {}

  @Post('save-reaction-main-post')
  create(@Body() createPostReactionDto: CreatePostReactionDto): Promise<PostReaction> {
    return this.postReactionService.create(createPostReactionDto);
  }

  @Get()
  findAll(): Promise<PostReaction[]> {
    return this.postReactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostReaction> {
    return this.postReactionService.findOne(id);
  }

  // get all reaction types for a post
  @Get('post/:post_id')
  findAllByPost(@Param('post_id') post_id: string): Promise<PostReaction[]> {
    return this.postReactionService.findAllByPost(post_id);
  }

  // update and remove methods are not implemented in the controller
  // as they are not required for this example
  // you can implement them if you need them
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostReactionDto: CreatePostReactionDto): Promise<PostReaction | string> {
    return this.postReactionService.update(id, updatePostReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postReactionService.remove(id);
  }
}
