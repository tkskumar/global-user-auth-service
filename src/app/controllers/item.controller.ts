import {
  Get,
  Post,
  Body,
  Controller,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from '../module/dto/item.dto';
import ItemsService from '../module/services/item.servie';
import { Item } from '../module/interface/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    this.itemsService.create(createItemDto);
  }
}
