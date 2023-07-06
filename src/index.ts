/*
 *     该副本基于koishi框架,仅用于娱乐目的。
 *     Copyright (C) 2023-present yun
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Affero General Public License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Context, Schema} from 'koishi'
import {} from '@koishijs/plugin-adapter-onebot'
// import {} from 'koishi-plugin-cron'

export const name = 'change-qq-group-name'

export interface Config {
}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // write your plugin here
  ctx.command("groupname <groupname>")
    .usage("groupname 示例群名")
    .option("cron", "-c [cron] cron表达式,用于定时执行")
    .action(async ({session, options}, groupname) => {
      if (session.channelId === undefined || session.channelId === null) {
        return "只能在群组里面使用"
      }
      if (session.platform == "onebot") {
        // if (options.cron !== undefined && options.cron !== null) {
        //   ctx.cron(options.cron, () => {
            session.onebot.setGroupName(session.channelId, groupname)
          // })
        // } else {
        //   await session.onebot.setGroupName(session.channelId, groupname)
        // }
        return `设置群名称为${groupname}`
      } else {
        return "只能在onebot平台可用"
      }
    })
}
