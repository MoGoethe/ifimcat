import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class UploadResolver{
  constructor(
    private readonly uploadService: UploadService
  ){}

  @Mutation(() => String)
  async fileUpload(
    @Args({name: 'file', type: () => GraphQLUpload}) file: FileUpload,
  ): Promise<string> {
    console.log(file)
    return this.uploadService.fileUpload(file)
  }
}