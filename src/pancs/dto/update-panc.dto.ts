import { PartialType } from '@nestjs/mapped-types';
import { CreatePancDto } from './create-panc.dto';

export class UpdatePancDto extends PartialType(CreatePancDto) {}
