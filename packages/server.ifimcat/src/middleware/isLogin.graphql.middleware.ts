// import { MiddlewareFn } from "@nestjs/graphql";
// import { GraphQLContext } from "../shared/context";


// export const IsLogin: MiddlewareFn<GraphQLContext> = async ({ context }, next) => {
//   if (!context.req.session!.userId) {
//     //throw new Error('not login');
//     console.log('not login')
//   } else {
//     console.log('login')
//   }
//   return next();
// }