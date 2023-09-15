---
title: Nest Validator 校验参数
date: 2023-09-15
tags: Nodejs
comments: true
categories: Nodejs
---

### 缘起

> 在Nest Controller 对客户端参数校验并处理同意的异常结果 Message，例如 校验参数 1< name < 100, 响应不同的 Message “ 请填写 name 长度 1 ~ 100 之间 ！” 等等



- 蹩脚写法

```typescript
@Controller('list')
export class ListController {
  @Post()
  addList(@Body() body): any {
    const { name } = body;
    if(name.length > 100) {
			.....
    }
  }
}
```



可以使用 `class-validator` 来完成对参数的校验，[class-validator](https://www.npmjs.com/package/class-validator)



### 示例

```shell
npm i --save class-validator class-transformer
```

or

```shell
yarn add class-validator class-transformer
```



> class-validator 和 class-transformer 是一个作者，前者提供数据的校验，后者提供对复杂数据结构的类型转换



使用之前我们先定义一个 Dto 例如 dto.ts 👇🏻 



```typescript
class FooBodyDto {
  @IsString()
  @Length(1, 100, {
    message: '请输入1-100长度之间的名称',
  })
  name: string;
}

export { FooBodyDto };
```

使用这个 dto 来校验我们需要的参数

> 处理结果 还可以使用 validateOrReject 具体参考文档

```typescript
@Controller('list')
export class ListController {
  @Post()
  async addList(@Body() body): Promise<any> {
    const { name } = body;
    const post = plainToClass(FooBodyDto, { name });
    const errors = await validate(post);

    if (errors.length > 0) {
      const msgs = [];
      errors.forEach((item) => {
        msgs.push(Object.values(item.constraints)[0]);
      });
      throw new HttpException(String(msgs), 500);
    } else {
      // ...
    }
  }
}
```



这段代码，使用 `plainToClass` 来把客户端的参数转换为 `validate` 需要的类，然后使用 Dto 里面的校验来对我们的参数进行校验，最好返回的 `errors` 然后我们对里面的校验结果我们自定义的文案也就是 `message` 进行合并处理最后用`HttpException` 异常状态 来抛给 客户端。

完整的逻辑我们还需要一个 Res 拦截器来处理这个异常 例如 response-interceptor.interceptor.ts 👇🏻

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data,
        };
      }),
      catchError((error) => {
        // 处理异常的数据结构
        return throwError(
          () =>
            new BadGatewayException({
              success: false,
              code: 500,
              message: error.message,
            }),
        );
      }),
    );
  }
}

```



### class-validator

> class-validator 来校验参数，除了以上直接使用 validate 、validateOrReject 、还可以直接在 body 上校验
>
> [class-validator](https://www.npmjs.com/package/class-validator) 更多参考文档这里就不做过多赘述



```typescript
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    // 在这里，如果请求体不满足 CreateUserDto 的验证规则，
    // NestJS 将自动返回一个带有错误详情的 400 Bad Request 响应。

    // 如果验证成功，你可以安全地使用 createUserDto
    // ...
  }
}
```





---



### class-transformer

> class-transformer 不仅可以对 dto 的转换 还可以执行参数的转换 例如
>
> [class-transformer](https://www.npmjs.com/package/class-transformer#plaintoclass) 更多参考文档这里就不做过多赘述



- classToPlain & plainToClass 就是实例和对象的相互转化啦



```typescript
import { classToPlain } from 'class-transformer';

let user = new User();
// ...给 user 赋值...

let plainUser = classToPlain(user);

------- 分割线 -------


import { plainToClass } from 'class-transformer';

let plainUser = { /* ... */ };

let user = plainToClass(User, plainUser);

```



```typescript
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude() 
export class User {
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(value => value.toUpperCase(), { toClassOnly: true })
  email: string;
}
```



- `@Exclude()`：此装饰器用于指定不应该被包含在转换过程中的属性。如果你在类的定义中使用了 `@Exclude()` 装饰器，那么默认情况下将不包含任何属性，只有被 `@Expose()` 装饰的属性才会被包含。这对于处理敏感信息非常有用，例如，你可能想要在转换用户对象时排除密码字段。
- `@Expose()`：此装饰器用于指定应该被包含在转换过程中的属性。如果你没有在类的定义中使用 `@Exclude()` 装饰器，那么默认情况下会包含所有属性，使用 `@Expose()` 装饰器在这种情况下没有实际效果。然而，如果你使用了 `@Exclude()`，那么只有被 `@Expose()` 装饰的属性才会被包含。
- `@Transform()`则是对特定属性的转换，如email 就被 toUpperCase 转换为大写







 