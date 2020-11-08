import { Message } from 'discord.js';
import fs from 'fs';

import * as sounds from '~/util/db/Sounds';
import localize from '~/util/i18n/localize';
import { existsSound, getPathForSound } from '~/util/SoundUtil';

import Command from '../base/Command';
import userHasElevatedRole from '../util/userHasElevatedRole';

export class RemoveCommand implements Command {
  public readonly TRIGGERS = ['remove'];
  public readonly NUMBER_OF_PARAMETERS = 1;
  public readonly USAGE = 'Usage: !remove <sound>';

  public run(message: Message, params: string[]) {
    if (!message.member) return;

    const allowedToRunCommand = userHasElevatedRole(message.member);
    if (!allowedToRunCommand) return;

    if (params.length !== this.NUMBER_OF_PARAMETERS) {
      message.channel.send(this.USAGE);
      return;
    }

    const sound = params.shift()!;
    if (!existsSound(sound)) {
      message.channel.send(localize.t('commands.remove.notFound', { sound }));
      return;
    }

    const file = getPathForSound(sound);
    fs.unlinkSync(file);
    sounds.remove(sound);

    message.channel.send(localize.t('commands.remove.success', { sound }));
  }
}