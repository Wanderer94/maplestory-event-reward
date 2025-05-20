export class CreateRewardDto {
  type: string; // e.g. point, item, coupon
  amount: number;
  description?: string;
}
