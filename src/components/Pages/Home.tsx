import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Login from "../Modal/Login";
import Navbar from "../Navbar/Navbar";
import Sell from "../Modal/Sell";
import { fetchFromFirestore } from "../Firebase/Firebase";
import { contextType, ItemsContext } from "../../components/Context/Items";

export interface ItemType {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  userName: string;
  createdAt: string;
  imageUrl: string;
}

const Home = () => {
  const [openModal, setModal] = useState<boolean>(false);
  const [openModalSell, setModalSell] = useState<boolean>(false);
  const itemsCtx: contextType | null = ItemsContext();

   const toggleModal = () => setModal(!openModal);
   const toggleModalSell = () => setModalSell(!openModalSell);

   useEffect(() => {
     const getItems = async () => {
      const datas = await fetchFromFirestore();
      itemsCtx?.setItems(datas);
     };
     getItems();
   },[itemsCtx?.items])

  return (
    <>
    <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
    <Login toggleModal={toggleModal} status={openModal}/>
    <Card items={(itemsCtx as contextType).items || []}/>
    <Sell setItems={(itemsCtx as contextType).setItems} toggleModal={toggleModalSell} status={openModalSell}/>
    </>
  )
}

export default Home;
