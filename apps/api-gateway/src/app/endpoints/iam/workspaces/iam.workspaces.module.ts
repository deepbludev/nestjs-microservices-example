import { Module } from '@nestjs/common'

import { IamWorkspacesPostController } from './post/iam.workspaces.post.controller'

@Module({
  controllers: [IamWorkspacesPostController],
})
export class IamWorkspacesModule {}
