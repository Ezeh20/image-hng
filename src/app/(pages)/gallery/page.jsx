"use client"
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button/Button'
import Container from '@/components/Container/Container'
import Cards from './internals/Cards'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import useSWR from 'swr'
import Image from 'next/image'
import loader from '../../assets/images/loader.svg'
import styles from './Gallery.module.scss'

const Gallery = () => {
    const router = useRouter()
    const session = useSession()
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, isLoading } = useSWR("/api/data", fetcher);
    const [gallery, setGallery] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])


    useEffect(() => {
        if (data) {
            setGallery(data?.data[0].gods)
        }
    }, [data])

    //protect the gallery route
    useEffect(() => {
        if (session.status === "unauthenticated") {
            router?.push('/')
        }
    }, [router, session.status])

    //search feature, basically just filtering the returned data
    useEffect(() => {
        const filtered = gallery.filter((itm) => itm.name.toLowerCase().includes(search))
        setFilter(filtered)
    }, [search, gallery])


    if (isLoading) {
        return (
            <div className={styles.main}>
                <div className={styles.overlay}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <Image width={'80'} height={'80'} src={loader} alt='loader' />
                </div>
            </div>
        )
    }
   

    if (session.status === "authenticated") {
        return (
            <main className={styles.main}>
                <div className={styles.overlay}>
                    <Container>
                        <div className={styles.section}>
                            <div className={styles.header}>
                                <input type="text" value={search} placeholder='search eg posiedon...' onChange={(e) => setSearch(e.target.value)} className={styles.input} />
                                <Button label={'Logout'} onClick={signOut} className={styles.button} />
                            </div>
                            <Cards filter={filter} setFilter={setFilter}  search={search}/>
                        </div>
                    </Container>
                </div>
            </main>
        )
    }
}

export default Gallery