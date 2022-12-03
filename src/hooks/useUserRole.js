import { useEffect, useState } from 'react';

const useUserRole = email => {
    const [isLoadingRole, setIsLoadingRole] = useState(true)
    const [role, setRole] = useState(null)
    useEffect(() => {
        if (email) {
            fetch(`https://used-phone-server.vercel.app/user?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data.role)
                    setIsLoadingRole(false)
                })
        }
    }, [email])
    return [role, isLoadingRole]

};

export default useUserRole;