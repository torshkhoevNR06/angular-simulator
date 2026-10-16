import { SortBy } from '../enum/SortBy';
import { SortOrder } from '../enum/SortOrder';

export interface ISortField {
  name: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}