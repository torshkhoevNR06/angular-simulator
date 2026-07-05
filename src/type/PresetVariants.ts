import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { NoraBaseDesignTokens } from '@primeuix/themes/nora/base';
import { LaraBaseDesignTokens } from '@primeuix/themes/lara/base';
import { Preset } from '@primeuix/themes/types';

export type PresetVariants = Preset<NoraBaseDesignTokens> | Preset<AuraBaseDesignTokens> | Preset<LaraBaseDesignTokens>;