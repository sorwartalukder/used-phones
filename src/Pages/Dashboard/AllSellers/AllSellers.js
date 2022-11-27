import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';

const AllSellers = () => {
    const { data: allSeller = [], isLoading, refetch } = useQuery({
        queryKey: ['all-seller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/all-seller');
            const data = res.json();
            return data
        }
    })
    const handleVerify = (id) => {
        console.log(id)


        fetch(`http://localhost:5000/users/${id}`, {
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
                        {
                            allSeller.map((seller, i) => <tr
                                key={seller._id}
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-11 rounded-full">
                                            <img src={seller.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {
                                        seller.verify ?
                                            <label
                                                onClick={() => handleVerify(seller._id)}
                                                className="btn btn-sm bg-green-500 text-white"
                                            >
                                                Verified </label>
                                            :

                                            <label
                                                onClick={() => handleVerify(seller._id)}
                                                className="btn btn-sm btn-primary bg-gradient-to-r from-primary to-secondary text-white"
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