'use client'

import 'bootstrap/dist/css/bootstrap.css'
import { Typography, AccordionGroup, Accordion, AccordionSummary, AccordionDetails, Chip, List, ListItem, ListItemDecorator, ListDivider, Avatar } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [index, setIndex] = useState(null)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const ordersInfo = localStorage.getItem("orders");
    if (orders) {
      setOrders(JSON.parse(localStorage.getItem("orders")));
    } else {
      setOrders([])
    }
  }, []);

  return (
    <div className='w-100 vh-100 d-flex flex-column'>
      <div className='w-100 p-3 bg-success d-flex flex-row'>
        <Typography level='h3' className='text-white'>SW - PT</Typography>
        <div className='flex-grow-1'></div>
        <Link href='/' className='btn px-2 mx-2' style={{ backgroundColor: "#eaeef6" }} title='Crear nueva orden'>
          <AddIcon />
        </Link>
      </div>
      <div className='w-100 flex-grow-1 p-3'>
        <Typography level='h2' textAlign='center'>Ordenes Realizadas</Typography>
        <hr />
        <div className='row'>
        {

          orders.length > 0 ?  
          (<AccordionGroup>
            {
              orders.map((order, i) => {
                return (
                  <Accordion
                    expanded={index === i}
                    onChange={(event, expanded) => {
                      setIndex(expanded ? i : null);
                    }}
                  >
                    <AccordionSummary>{i + 1}. Orden: {order.id} | Cliente: {order.client} </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <List>
                          {
                            order.items.map((product, i) => {
                              return (<div key={product.item.id}>
                                <ListItem>
                                  <ListItemDecorator>
                                    <Avatar size="sm" src={product.item.img} />
                                  </ListItemDecorator>
                                  {product.item.name}
                                  <Chip className='mx-2'>
                                    <Typography level="body-sm" fontWeight="lg">{"Cantidad: " + product.cant}</Typography>
                                  </Chip>
                                  <Chip className='mx-2'>
                                    <Typography level="body-sm" fontWeight="lg">{"Subtotal: $" + (product.item.price * product.cant).toFixed(2)}</Typography>
                                  </Chip>
                                </ListItem>
                                <ListDivider inset="startDecorator" />
                              </div>)
                            })
                          }
                          <ListItem>
                            <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                              <Typography level="body-sm" fontWeight="lg">Total: </Typography>
                              <Chip className='mx-2'>
                                <Typography level="body-sm" fontWeight="lg">{"$" + (order.items.reduce((a, b) => a + (b.cant * b.item.price), 0)).toFixed(2)}</Typography>
                              </Chip>
                            </div>
                          </ListItem>
                        </List>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )
              })
            }
          </AccordionGroup>) : <Typography level='h4' textAlign='center'>Sin Ordenes</Typography>
        }
        </div>
      </div>
    </div>
  )
}
