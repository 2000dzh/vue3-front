export type Writable<T> = { -readonly [k in keyof T]: T[k] }

export type WritableArray<T> = T extends readonly any[] ? Writable<T> : T

// type X = never extends never ? 1 : 0 // 1
// type Custom<T> = T extends never ? 1 : 0
// type T = Custom<never> // never
// 为什么使用泛型传入 T extends never 返回 never
// 因为 T extends never ? 时,会对联合类型进行分配,此时有一个特例,即当 T = never 时,会跳过分配直接返回 T本身,所以三元判断代码实际没有执行。
// [T] extends [never] 这种写法可以避免 TS 对联合类型进行分配,继而绕过这个问题
// https://zhuanlan.zhihu.com/p/534209521
export type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N

// 判断 T 是否为 unknown
export type IfUnknown<T, Y, N> = [unknown] extends [T] ? Y : N

export type UnknownToNever<T> = IfUnknown<T, never, T>
