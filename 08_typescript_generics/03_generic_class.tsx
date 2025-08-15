

type User = {
    id: number;
    name: string;
    email: string;
}

type Movie = {
    id: number;
    title: string;
    year: number;
}

export default class Factory<T> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public getAll(): T[] {
        return this.items;
    }

    public create(item: T): T {
        const id = this.items.length + 1;
        return { id, ...item };
    }
}

// Create a user factory
const userFactory = new Factory<User>();

userFactory.create({ id: 1, name: "John Doe", email: "john.doe@example.com" });
userFactory.getAll();

// Create a movie factory
const movieFactory = new Factory<Movie>();
movieFactory.create({ id: 1, title: "The Matrix", year: 1999 });
movieFactory.getAll();
