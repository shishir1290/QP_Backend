import { PartialType } from '@nestjs/mapped-types';
import { CreateStoryImageDto } from './create-story-image.dto';

export class UpdateStoryImageDto extends PartialType(CreateStoryImageDto) {}
