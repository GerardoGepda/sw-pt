import React from 'react'
import { Typography, Chip, Modal, ModalDialog, ModalClose, List, ListItem, ListItemDecorator, ListDivider, Avatar, Button, IconButton } from '@mui/joy'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Cart({ cart, open, setOpen }) {

    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <ModalClose />
                    <Typography level='h4'>Carrito</Typography>
                    <div className='my-2'></div>
                    <List
                        variant="outlined"
                        sx={{
                            minWidth: 240,
                            borderRadius: 'sm',
                        }}
                    >
                        {
                            cart.map((product, i) => {
                                return (<div key={product.item.id}>
                                    <ListItem>
                                        <div className='d-flex flex-row justify-content-between'>
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
                                            <IconButton>

                                            </IconButton>
                                        </div>
                                    </ListItem>
                                    <ListDivider inset="startDecorator" />
                                </div>)
                            })
                        }
                        <ListItem>
                            <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                                <Typography level="body-sm" fontWeight="lg">Total: </Typography>
                                <Chip className='mx-2'>
                                    <Typography level="body-sm" fontWeight="lg">{"$" + (cart.reduce((a, b) => a + (b.cant * b.item.price), 0)).toFixed(2)}</Typography>
                                </Chip>
                            </div>
                        </ListItem>
                    </List>
                    <div className='mt-3 d-flex flex-row justify-content-end'>
                        <Button startDecorator={<DoneAllIcon />} size='sm' color='success' onClick={() => handleAcceptOrder(cart)}>
                            Comprar
                        </Button>
                    </div>
                </ModalDialog>
            </Modal>
        </div>
    )
}
