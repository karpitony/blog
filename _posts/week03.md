# [3주차] TypeScript 기본 문법과 활용

다음주부터 구름톤 3기 연합 해커톤 시작이라서 이번 주는 협업에서 많이 쓰이고, 유용하다는 평가를 받는 TypeScript의 기본 문법과 개념을 공부했습니다. 특히 암묵적 타입과 명시적 타입의 차이, `unknown`, `void`, `never` 타입의 사용 방법, 그리고 함수의 오버로딩과 다형성에 대해 배웠습니다.

<br>

1. [TypeScript의 암묵적 타입과 명시적 타입](#typescript의-암묵적-타입과-명시적-타입)
    1. [암묵적 타입 추론](#1-암묵적-타입-추론)
    2. [명시적 타입 선언](#2-명시적-타입-선언)
2. [`unknown`, `void`, `never` 타입](#1-unknown-타입의-사용-방법과-이유)
    1. [`unknown` 타입의 사용 방법과 이유](#1-unknown-타입의-사용-방법과-이유)
    2. [`void` 타입의 의미와 사용처](#2-void-타입의-의미와-사용처)
    3. [`never` 타입의 역할과 활용 사례](#3-never-타입의-역할과-활용-사례)
3. [오버로딩과 다형성](#오버로딩과-다형성)
    1. [함수 오버로딩의 구현과 사용](#1-함수-오버로딩의-구현과-사용)
    2. [다형성의 개념과 제네릭](#2-다형성의-개념과-제네릭)

<hr>

## TypeScript의 암묵적 타입과 명시적 타입

> 배운 것들
> - 암묵적 타입 추론
> - 명시적 타입 선언

TypeScript는 JavaScript에 타입 시스템을 추가하여 코드를 더 안전하고 가독성 있게 만들어 줍니다. 변수나 함수의 타입을 명시적으로 선언할 수 있지만, 경우에 따라서는 TypeScript의 타입 추론을 통해 암묵적으로 타입이 결정되기도 합니다.

<br>

### 1. 암묵적 타입 추론
TypeScript는 변수에 초기값을 할당하면 해당 값에 따라 변수의 타입을 추론합니다. 이를 **암묵적 타입**이라고 합니다.

```typescript
let message = "Hello, TypeScript!";
// TypeScript는 message의 타입을 string으로 추론합니다.

message = "New message"; // 정상
message = 42; // 오류 발생: Type 'number' is not assignable to type 'string'.
```

#### 왜 쓰는가

암묵적 타입 추론은 코드의 간결성을 유지하면서도 타입 안정성을 확보할 수 있게 해줍니다. 모든 변수에 타입을 명시적으로 선언하지 않아도 TypeScript가 알아서 타입을 추론해주기 때문에 개발자의 부담을 줄여줍니다.

<br>

### 2. 명시적 타입 선언
반대로, 변수나 함수의 타입을 명시적으로 선언할 수 있습니다. 이를 통해 더욱 명확하게 코드의 의도를 나타낼 수 있습니다.

```typescript
let count: number;
count = 10; // 정상
count = "Ten"; // 오류 발생: Type 'string' is not assignable to type 'number'.

function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

#### 왜 쓰는가
명시적 타입 선언은 코드의 가독성을 높이고, 협업 시 다른 개발자들이 코드의 의도를 쉽게 파악할 수 있게 합니다. 또한, 복잡한 타입이나 타입 추론이 어려운 경우 명시적으로 타입을 선언하면 타입 안정성을 확보할 수 있습니다.

<br>

## `unknown`, `void`, `never` 타입

> 배운 것들
> - unknown 타입의 사용 방법과 이유
> - void 타입의 의미와 사용처
> - never 타입의 역할과 활용 사례
TypeScript는 다양한 타입을 제공하여 코드의 안정성과 표현력을 높입니다. 그 중에서도 unknown, void, never 타입은 특별한 의미를 가지며, 적절한 상황에서 사용하면 도움이 됩니다.

<br>

### 1. `unknown` 타입의 사용 방법과 이유
`unknown` 타입은 모든 타입의 값을 가질 수 있지만, 실제로 사용하기 위해서는 타입 검사를 거쳐야 합니다.

```typescript
let value: unknown;
value = "Hello";
value = 42;

if (typeof value === "string") {
  console.log(value.toUpperCase()); // 타입 검사를 거친 후에야 사용 가능
}
```

#### 왜 쓰는가
`unknown` 타입은 타입 안정성을 높이기 위해 사용됩니다. `any` 타입과 달리, `unknown` 타입의 값은 사용 전에 반드시 타입 검사를 해야 하므로, 실수로 잘못된 타입의 값을 사용하는 것을 방지할 수 있습니다.

<br>

### 2. `void` 타입의 의미와 사용처
`void` 타입은 함수에서 아무것도 반환하지 않을 때 사용합니다.

```typescript
function logMessage(message: string): void {
  console.log(message);
}

const result = logMessage("Hello"); // result의 타입은 void
```

#### 왜 쓰는가
`void` 타입을 사용하면 함수가 값을 반환하지 않는다는 것을 명시적으로 나타낼 수 있습니다. 이는 함수의 사용 방법을 더 명확하게 해주며, 반환 값을 사용하려는 시도를 컴파일 타임에 잡아낼 수 있습니다.

<br>

### 3. never 타입의 역할과 활용 사례
`never` 타입은 절대 발생하지 않는 값을 나타냅니다. 예를 들어, 함수가 예외를 throw하거나 무한 루프에 빠져서 절대 반환하지 않을 때 사용합니다.

```typescript
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```
#### 왜 쓰는가
`never` 타입은 타입 시스템에 더 엄격한 체크를 가능하게 합니다. 함수가 정상적으로 반환하지 않는다는 것을 명시적으로 나타내어, 이후의 코드가 실행되지 않음을 컴파일러가 알 수 있게 해줍니다.

<br>

## 오버로딩과 다형성

> 배운 것들
> - 함수 오버로딩의 구현과 사용
> - 다형성의 개념과 제네릭

함수 오버로딩과 다형성은 코드의 재사용성과 유연성을 높이는 중요한 개념입니다. TypeScript에서는 함수 오버로딩과 제네릭을 통해 다형성을 구현할 수 있습니다.

<br>

### 1. 함수 오버로딩의 구현과 사용

TypeScript에서는 동일한 함수 이름에 여러 가지 시그니처를 정의하여 오버로딩을 구현할 수 있습니다.

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}

const sum = add(10, 20); // sum의 타입은 number
const concatenated = add("Hello, ", "World!"); // concatenated의 타입은 string
```

#### 왜 쓰는가
함수 오버로딩은 동일한 기능을 수행하지만 입력 타입이나 개수가 다른 경우에 유용합니다. 이를 통해 코드의 일관성을 유지하면서 다양한 입력을 처리할 수 있습니다.

<br>

### 2. 다형성의 개념과 제네릭
다형성은 여러 가지 타입에 대해 동일한 코드 구조를 사용할 수 있게 해주는 개념입니다. TypeScript에서는 제네릭을 사용하여 다형성을 구현합니다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("Hello"); // 명시적으로 타입 지정
let output2 = identity(42); // 타입 추론에 의해 number로 간주
```

### 왜 쓰는가
제네릭을 사용하면 함수나 클래스를 다양한 타입에 대해 재사용할 수 있습니다. 이는 코드의 중복을 줄이고, 타입 안전성을 유지하면서도 유연한 코드를 작성할 수 있게 해줍니다.

<hr>

이번 주에는 TypeScript의 타입 시스템과 고급 기능들을 배우면서, 코드의 안전성과 효율성을 높이는 방법을 익혔습니다. 특히 암묵적 타입과 명시적 타입 선언의 장단점을 이해하고, unknown, void, never 타입의 적절한 사용법을 알게 되었습니다. 또한, 함수 오버로딩과 제네릭을 통해 다형성을 구현하여 코드의 재사용성을 높이는 방법을 배웠습니다.

앞으로의 프로젝트에서 TypeScript를 활용하여 더욱 견고하고 유지보수하기 쉬운 코드를 작성할 수 있을 것 같습니다.