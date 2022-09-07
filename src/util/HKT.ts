export interface HKT {
    readonly A?: unknown
    readonly B?: unknown
    readonly type?: unknown
}

export type Kind<F extends HKT, A, B> = (
    F extends { readonly type: unknown }
        ? (F & {
            readonly A: A
            readonly B: B
        })['type']
        : {
            readonly _F: F
            readonly _A: () => A
            readonly _B: () => B
        }
)

type Thing1<A, B> = {
    thing1A: A
    thing1B: B
}
type Thing2<A, B> = {
    thing2A: A
    thing2B: B
}

interface Thing1HKT extends HKT {
    readonly type: Thing1<this['A'], this['B']>
}
interface Thing2HKT extends HKT {
    readonly type: Thing2<this['A'], this['B']>
}

type Test = Kind<Thing1HKT, 'XXX', 'YYY'>