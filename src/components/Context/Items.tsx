import { useContext , createContext, ReactNode, useState, useEffect} from "react";
import { ItemType } from "../../components/Pages/Home";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";

export interface contextType {
    items : ItemType[] | null
    setItems : React.Dispatch<React.SetStateAction<ItemType[] | null>>
}

const Context = createContext<contextType|null>(null)
export const ItemsContext = () => useContext(Context)

interface itemsProviderProps {
    children: ReactNode;
}

export const ItemsContextProvider = ({ children }: itemsProviderProps) => {
    
    const [items, setItems] = useState<ItemType[] | null>(null);

    useEffect(() => {
        const fetchItemsFromFireSrote = async () => {
            try {
                const productsCollection = collection(firestore, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList: any = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(productsList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchItemsFromFireSrote();
    }, []);

    return (
        <>
            <Context.Provider value={{ items, setItems }}>
                {children}
            </Context.Provider>
        </>
    );
};
