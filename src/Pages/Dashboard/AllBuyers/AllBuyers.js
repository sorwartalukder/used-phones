import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

const AllBuyers = () => {
    const { data: allBuyer = [], isLoading } = useQuery({
        queryKey: ['all-seller'],
        queryFn: async () => {
            const res = await fetch('https://used-phone-server.vercel.app/all-buyer', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('usePhonsToken')}`
                }
            });
            const data = res.json();
            return data
        }
    })
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='mb-36'>
            <h2 className="text-3xl text-center bg-slate-900 text-white py-6">Total Buyer: {allBuyer?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>picture</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBuyer?.length &&
                            allBuyer.map((buyer, i) => <tr
                                key={buyer._id}
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <Link to={`/User/Details/${buyer.email}`}>
                                        <div className="avatar">
                                            <div className="w-11 rounded-full hover:shadow-md hover:shadow-primary">
                                                <img src={buyer.image} alt='' />
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;