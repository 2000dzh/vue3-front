import type { epPropKey } from './runtime'
import { IfNever, UnknownToNever, WritableArray } from './utils'
import type { ExtractPropTypes, PropType } from 'vue'

type Value<T> = T[keyof T]

/**
 *
 * 提取单个 prop 的参数类型
 *
 * @example
 * ExtractPropType<{ type: StringConstructor }> => string | undefined
 * ExtractPropType<{ type: StringConstructor, required: true }> => string
 * ExtractPropType<{ type: BooleanConstructor }> => boolean
 */
export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{ key: T }>
>

/**
 *
 * 通过 `ExtractPropTypes` 提取类型，接受 `PropType<T>`、`XXXConstructor`、`never`...
 *
 * @example
 * ResolvePropType<BooleanConstructor> => boolean
 * ResolvePropType<PropType<T>> => T
 **/
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>
    required: true
  }>
>

/**
 * Merge Type, Value, Validator types
 * 合并 Type、Value、Validator 的类型
 *
 * @example
 * EpPropMergeType<StringConstructor, '1', 1> =>  1 | "1" // ignores StringConstructor
 * EpPropMergeType<StringConstructor, never, number> =>  string | number
 */
export type EpPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>

/**
 * 处理输入参数的默认值（约束）
 */
export type EpPropInputDefault<
  Required extends boolean,
  Default,
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
  ? () => Default
  : (() => Default) | Default

/**
 *
 * 原生 prop `类型，BooleanConstructor`、`StringConstructor`、`null`、`undefined` 等
 */
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N

/**
 *
 * prop 输入参数（约束）
 *
 * @example
 * EpPropInput<StringConstructor, 'a', never, never, true>
 * ⬇️
 * {
    type?: StringConstructor | undefined;
    required?: true | undefined;
    values?: readonly "a"[] | undefined;
    validator?: ((val: any) => boolean) | ((val: any) => val is never) | undefined;
    default?: undefined;
  }
 */
export type EpPropInput<
  Type,
  Value,
  Validator,
  Default extends EpPropMergeType<Type, Value, Validator>,
  Required extends boolean,
> = {
  type?: Type
  required?: Required
  values?: readonly Value[]
  // https://barwe.cc/2022/08/22/ts-is
  // is 类型谓词,用来帮助ts收窄类型
  // 根据 val 的值更新类型信息
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean)
  default?: EpPropInputDefault<Required, Default>
}

function isNill<T>(val: T | undefined | null): val is undefined | null {
  return val === undefined || val === null
}

function test(v: number | undefined | null) {
  if (!isNill(v)) {
    return Math.floor(v)
  }
}

/**
 *
 * prop 输出参数。
 *
 * @example
 * EpProp<'a', 'b', true>
 * ⬇️
 * {
    readonly type: PropType<"a">;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly default: "b";
    __epPropKey: true;
  }
 */
export type EpProp<Type, Default, Required> = {
  readonly type: PropType<Type>
  readonly required: [Required] extends [true] ? true : false
  readonly validator: ((val: unknown) => boolean) | undefined
  [epPropKey]: true
} & IfNever<Default, unknown, { readonly default: Default }>

/**
 * 确定是否为“EpProp”
 */
export type IfEpProp<T, Y, N> = T extends { [epPropKey]: true } ? Y : N

/**
 *
 * 将输入转换为输出
 */
export type EpPropConvert<Input> = Input extends EpPropInput<
  infer Type,
  infer Value,
  infer Validator,
  any,
  infer Required
>
  ? EpPropFinalized<Type, Value, Validator, Input['default'], Required>
  : never

/**
 *
 * 最终转换 EpProp
 */
export type EpPropFinalized<Type, Value, Validator, Default, Required> = EpProp<
  EpPropMergeType<Type, Value, Validator>,
  UnknownToNever<Default>,
  Required
>
