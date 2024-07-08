import { PartialType } from '@nestjs/mapped-types';
import { CreateStoryImageDto } from './create-story.dto';

export class UpdateStoryDto extends PartialType(CreateStoryImageDto) {}
