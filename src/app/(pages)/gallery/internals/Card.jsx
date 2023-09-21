import React from 'react'
import styles from './Cards.module.scss'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Card = ({ itm }) => {
    const { id, name, img, domain } = itm
    const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useSortable({
        id: id, transition: null
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform && { ...transform, scaleX: .8, scaleY: .8 }),
        backgroundImage: `url(${img})`,
        width: '100%',
        height: '400px',
        borderRadius: '5px',
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "pointer"
    }
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} className={styles.card}
            style={style}>
            <div className={styles.overlay}>
                <p className={styles.name}>{name}</p>
                <p>{domain}</p>
            </div>
        </div>
    )
}

export default Card