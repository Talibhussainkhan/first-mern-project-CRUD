import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProduct: (products) => set({ products }),

    createProduct: async (newProducts) => {
        if (!newProducts.name || !newProducts.price || !newProducts.image) {
            return { success: false, message: "Please Fill All Field" }
        }
        const res = await fetch('/api/product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProducts)
        })
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: "Product Store Succesfully" }
    },
    fetchProduct: async () => {
        const res = await fetch('/api/product')
        const data = await res.json();
        set({ products: data.data })
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/product/${pid}`, {
            method: "DELETE"
        })
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set((state) => ({ products: state.products.filter(product => product._id !== pid) }))
        return { success: true, message: data.message };
    },
    updateProduct : async (pid, updatedProduct) => {
        const res = await fetch(`/api/product/${pid}`,{
            method : "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(updatedProduct)
        })
        const data = await res.json();
        if(!data.success) return {success:false, message: data.message}
        set(state=>({
            products : state.products.map((product)=> product._id === pid? data.data:product)
        })
        )
        return {success:true, message:data.message}
    }


}))