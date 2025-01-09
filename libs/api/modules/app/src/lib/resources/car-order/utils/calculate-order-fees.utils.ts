import { Injectable } from '@nestjs/common';
import { CreateNormalCarOrderInput } from '../inputs/create-car-order.input';
import { Accessory } from '@prisma/client';

@Injectable()
export class CalculateOrderFeesService {


  /**
   * Calculates the total fees for accessories based on their quantity and price.
   *
   * @param {Object} params - An object containing the accessories data.
   * @param {Array} params.accessories - A list of accessories with their ids and quantities.
   * @param {Array} accessoryData - A list of accessory details including id and price.
   * @return {number} The calculated total fees for the given accessories.
   */
  calculateAccessoriesFees(
    { accessories }: Pick<CreateNormalCarOrderInput, 'accessories'>,
    accessoryData: Accessory[]
  ): number {
    return accessories.reduce((total, accessory) => {
      const item = accessoryData.find((el) => el.id === accessory.accessoryId);
      return total + accessory.quantity * (item?.price || 0);
    }, 0);
  }

  /**
   * Calculates the total fees based on the base fee, accessories fee, and optional tips.
   *
   * @param {number} baseFee - The base fee amount.
   * @param {number} accessoriesFee - The fee amount for accessories.
   * @param {number} tips - An optional amount for tips. Defaults to 0 if not provided.
   * @return {number} The total calculated fee.
   */
  calculateTotalFees(
    baseFee: number,
    accessoriesFee: number,
    tips: number
  ): number {
    return baseFee + accessoriesFee + (tips || 0);
  }
}
