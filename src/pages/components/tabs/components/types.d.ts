export interface Store {
    id: number
    name: string
    address: string
    phone: string
}

export interface Order {
    id: string
    createTime: string
    amount: string
    status: string
}

export interface Product {
    skuId: number
    name: string
    img: string
    price: string
    qty: number
}

export interface OrderItem {
    store: Store
    order: Order
    product: Product
}
