"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const Gallery = () => {
    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router?.push('/')
        }
    }, [router, session.status])

    if (session.status === "authenticated") {
        return (
            <div>
                <div>Gallery</div>
                <button onClick={signOut}>LogOut</button>
            </div>
        )
    }
}

export default Gallery