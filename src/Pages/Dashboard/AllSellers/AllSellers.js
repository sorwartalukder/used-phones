import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

const AllSellers = () => {
    const { data: allSeller = [], isLoading, refetch } = useQuery({
        queryKey: ['all-seller'],
        queryFn: async () => {
            const res = await fetch('https://used-phone-server.vercel.app/all-seller', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('usePhonsToken')}`
                }
            });
            const data = res.json();
            return data
        }
    })
    const handleVerify = (id, email) => {
        console.log(email)
        fetch(`https://used-phone-server.vercel.app/products?email=${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userVerify: true })
        })
            .then(res => res.json())
            .then(data => {
            })

        fetch(`https://used-phone-server.vercel.app/users/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ verify: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verify successful.')
                    refetch()
                }
            })

    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='mb-36'>
            <h2 className="text-3xl text-center bg-slate-900 text-white py-6">Total Seller: {allSeller?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSeller?.length &&
                            allSeller.map((seller, i) => <tr
                                key={seller._id}
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <Link to={`/User/Details/${seller.email}`}>
                                        <div className="avatar">
                                            <div className="w-11 rounded-full hover:shadow-md hover:shadow-primary">
                                                <img src={seller.image} alt='' />
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {
                                        seller.verify ?
                                            <label
                                                onClick={() => handleVerify(seller._id)}
                                                className="btn btn-sm bg-green-500 text-white hover:bg-green-500"
                                            >
                                                Verified </label>
                                            :

                                            <label
                                                onClick={() => handleVerify(seller._id, seller.email)}
                                                className="btn btn-sm btn-primary bg-gradient-to-r from-primary to-secondary text-white hover:shadow-secondary hover:shadow-md"
                                            >
                                                Verify</label>
                                    }

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;