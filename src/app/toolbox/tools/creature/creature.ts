import { Tool } from '@bm/toolbox/tools/tool';

import { CreatureHandler } from './handler';

export class CreatureTool implements Tool {
  id = 3;
  title = 'Creature';
  icon = 'mdi-chess-knight';
  settingsComponent = undefined;
  handler = CreatureHandler;
}