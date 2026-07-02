import { Theme } from "../enum/Theme"; 
import { Preset } from "@primeuix/themes/types";

export interface ITheme {
  name: string;
  value: Theme;
  preset: Preset;
}