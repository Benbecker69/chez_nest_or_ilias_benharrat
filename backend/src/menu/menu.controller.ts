import { Controller, Post, Body } from '@nestjs/common';
import { IsArray } from 'class-validator';
import { MenuService } from './menu.service';
import type { MenuDiscountResult } from './menu.service';

class TestMenuDto {
  @IsArray()
  pizzaPrices: number[];

  @IsArray()
  drinkPrices: { price: number; withAlcohol: boolean }[];

  @IsArray()
  dessertPrices: number[];
}

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * Endpoint de test pour vérifier le calcul de réduction
   * Sera supprimé en production (uniquement pour validation)
   */
  @Post('test-discount')
  testDiscount(@Body() testData: TestMenuDto): MenuDiscountResult {
    return this.menuService.computeDiscount(
      testData.pizzaPrices,
      testData.drinkPrices,
      testData.dessertPrices,
    );
  }
}
