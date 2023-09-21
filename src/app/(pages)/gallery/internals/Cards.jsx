import styles from './Cards.module.scss'
import Card from './Card'
import { DndContext, closestCenter, MouseSensor, KeyboardSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, rectSwappingStrategy } from '@dnd-kit/sortable'

const Cards = ({ filter, setFilter, search }) => {
    const mouseSensor = useSensor(MouseSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(
        mouseSensor,
        keyboardSensor,
    );

    const onDragEnd = (e) => {
        const { active, over } = e
        if (active?.id === over?.id) {
            return;
        }
        setFilter((itms) => {
            const outDated = itms.findIndex((itm) => itm.id === active?.id)
            const current = itms.findIndex((itm) => itm.id === over?.id)
            return arrayMove(filter, outDated, current)
        })
    }

    return (
        <>
            {
                filter.length === 0 ? <p>No result for {search} </p> :
                    <div className={styles.main}>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                            <SortableContext items={filter} strategy={rectSwappingStrategy}>
                                {
                                    filter.map((itm) => {
                                        return (
                                            <Card key={itm.name} itm={itm} />
                                        )
                                    })
                                }
                            </SortableContext>
                        </DndContext>
                    </div>
            }
        </>
    )
}

export default Cards