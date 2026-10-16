import { SortBy } from '../enum/SortBy';
import { SortOrder } from '../enum/SortOrder';

export interface IProductParams {
  limit?: number;
  skip?: number;
  category?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  search?: string;
}