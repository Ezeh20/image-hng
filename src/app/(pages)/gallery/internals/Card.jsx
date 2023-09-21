import React from 'react'
import styles from './Cards.module.scss'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'

const Card = ({ itm }) => {
    const { id, name, img, domain } = itm
    const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useSortable({
        id: id, transition: null
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform && { ...transform, scaleX: .8, scaleY: .8 }),
        // backgroundImage: `url(${img})`,
        width: '100%',
        height: '400px',
        borderRadius: '5px',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "pointer",
        touchAction: "manipulation"
    }


    return (
        <div ref={setNodeRef} {...attributes} {...listeners} className={styles.card}
            style={style}>
            <Image fill objectFit="cover" priority={true} src={img} alt={name} style={{ borderRadius: '5px' }} />
            <div className={styles.overlay}>
                <p className={styles.name}>{name}</p>
                <p>{domain}</p>
            </div>
        </div>
    )
}

export default Card