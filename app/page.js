'use client'

import 'bootstrap/dist/css/bootstrap.css'
import { Typography, Modal, ModalDialog, FormControl, Stack, FormLabel, Input, Button, IconButton } from '@mui/joy'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import { useEffect, useState } from 'react'
import CustomCard from './components/customCard'
import Order from './components/order';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartActive, setCartActive] = useState(false);
  const [client, setClient] = useState('');
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  useEffect(() => {
    async function getData() {
      const newData = await (await fetch("https://65009e8c18c34dee0cd535cb.mockapi.io/food")).json();
      setData(newData);
    }
    getData()
  }, [client, cartActive]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const arrData = Array.from(formData.values());
    if (arrData.length == 0) {
      return;
    }
    setClient(arrData[0]);
    setCart([]);
    setCartActive(false);
    setOpen(false);
  }

  const handleAddProduct = (product) => {
    const editCart = cart;
    editCart.push(product);
    setCart(editCart);
    setCartActive(true);
  }

  const handleRemoveProduct = (id) => {
    console.log(cart);
    const editCart = cart.filter(product => product.item.id != id);
    console.log(editCart);
    setCart(editCart);
    setCartActive(true);
  }

  const handleNewCant = (id, cant) => {
    console.log(cart);
    console.log(cart.indexOf(cart.find(product => product.item.id != id)));
  }

  const handleAcceptOrder = (cart) => {
    if (localStorage.getItem("orders")) {
        const orders = JSON.parse(localStorage.getItem("orders"));
        orders.push({id: (new Date()).getTime(), client: client, items: cart});
        localStorage.setItem("orders", JSON.stringify(orders))
    } else {
        localStorage.setItem("orders", JSON.stringify([{id: (new Date()).getTime(), client: client, items: cart}]))
    }

    setOpenOrder(false);
    setCart([]);
    setCartActive(false);
    setClient('');

    alert("¡Se agregó su orden!, sistema listo para recibir nueva orden.");
}

  return (
    <div className='w-100 vh-100 d-flex flex-column'>
      <div className='w-100 p-3 bg-success d-flex flex-row'>
        <Typography level='h3' className='text-white'>SW - PT</Typography>
        <div className='flex-grow-1'></div>
        {
          cartActive && (<IconButton variant='soft' className='mx-2' title='Ver Carrito' onClick={() => {setOpenOrder(true)}}><ShoppingCartIcon/></IconButton>)
        }
        <IconButton variant='soft' title='Nuevo Cliente' onClick={() => setOpen(true)}>
          <PersonAddIcon/>
        </IconButton>
        <Link href='/orders' className='btn px-2 mx-2' style={{backgroundColor: "#eaeef6"}} title='Ordenes realizadas'>
          <ListIcon/>
        </Link>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ maxWidth: 500 }}>
          <Typography level="h2">
            Nuevo cliente
          </Typography>
          <Typography>
            Ingrese su nombre.
          </Typography>
          <form
            onSubmit={handleFormSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input name='cliente' autoFocus required />
              </FormControl>
              <Button type="submit" color='success'>Aceptar</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Order open={openOrder} setOpen={setOpenOrder} handleAcceptOrder={handleAcceptOrder} cart={cart} client={client}/>
      <div className='w-100 flex-grow-1 p-3'>
        <Typography level='h2' textAlign='center'>Menú Principal</Typography>
        <hr/>
        <div className='row'>
        {
          data.map(item => {
           return (
            <div className='col-3 my-2' key={item.id}>
              <CustomCard item={item} client={client} onAdd={handleAddProduct}/>
            </div>
           )
          })
        }
        </div>
      </div>
    </div>
  )
}
