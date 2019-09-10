// import {
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
//   Logger,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     call$: Observable<any>,
//   ): Observable<any> {
//     const ctx = context.switchToHttp();
//     const request = ctx.getRequest();

//     const before = Date.now();
//     const { method, url } = request.raw;
//     return call$.pipe(
//       tap(() =>
//         Logger.log(
//           `${method} ${url} - ${Date.now() - before}ms`,
//           context.getClass().name,
//           false,
//         ),
//       ),
//     );
//   }
// }
