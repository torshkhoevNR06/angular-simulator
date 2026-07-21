import { InjectionToken } from '@angular/core';
import { IAppConfig } from './interface/IAppConfig';

export const APP_CONFIG: InjectionToken<IAppConfig> = new InjectionToken<IAppConfig>('APP_CONFIG');