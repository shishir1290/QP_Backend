import { PartialType } from '@nestjs/mapped-types';
import { CreateStoryTextDto } from './create-story-text.dto';

export class UpdateStoryTextDto extends PartialType(CreateStoryTextDto) {}
