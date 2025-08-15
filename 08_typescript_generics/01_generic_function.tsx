
// Generic function with a type argument T
async function getData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
}

// example usage

type Product = {
    id: number;
    name: string;
    price: number;
};

const products = getData<Product[]>("https://fakestoreapi.com/products");

type User = {
    id: number;
    name: string;
    email: string;
};  

const users = getData<User[]>("https://fakestoreapi.com/users");
