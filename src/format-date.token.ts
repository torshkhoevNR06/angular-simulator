import { InjectionToken } from '@angular/core';
import { DatePipeConfig } from '@angular/common';

export const DATE_PIPE_DEFAULT_OPTIONS: InjectionToken<DatePipeConfig> = new InjectionToken<DatePipeConfig>('DATE_PIPE_DEFAULT_OPTIONS');