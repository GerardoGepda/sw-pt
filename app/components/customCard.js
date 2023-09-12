import React from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import { Typography, Card, AspectRatio, IconButton, Chip } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import QueueAdd from '@mui/icons-material/Queue'
import { useState } from 'react'

export default function customCard({item, onAdd, client}) {
    const [cant, setCant] = useState(0)
    const [disabled, setDisabled] = useState(false);
  return (
    <Card>
        <div>
            <Typography level="title-lg">{item.name}</Typography>
            <Chip>
                <Typography level="body-sm" fontWeight="lg">{"$" + item.price}</Typography>
            </Chip>
            <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                onClick={() => {
                    if (!client) {
                        alert("Debe ingresar el nombre del cliente.");
                        return;
                    }
                    if (cant < 1) {
                        alert("Debe seleccionar una cantidad");
                        return;
                    }
                    onAdd({cant: cant, item: item});
                    setDisabled(true);
                }}
                disabled={disabled}
            >
                <QueueAdd/>
            </IconButton>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
            <Image src={item.img} width={640} height={480} alt={item.name}/>
        </AspectRatio>
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <IconButton variant='solid' color='success' size='sm' disabled={disabled} onClick={() => {setCant(cant + 1)}}>
            <AddIcon/>
            </IconButton>
            <div className='mx-2'>
            <Typography level="body-xs">Cantidad</Typography>
            <Typography fontSize="lg" fontWeight="lg" textAlign='center'>
                {cant}
            </Typography>
            </div>
            <IconButton variant='solid' color='danger' size='sm' disabled={disabled} onClick={() => {cant > 0 ? setCant(cant - 1) : 0}}>
            <RemoveIcon/>
            </IconButton>
        </div>
    </Card>
  )
}
