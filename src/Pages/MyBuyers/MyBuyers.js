import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';

const MyBuyers = () => {
    const { user } = useContext(AuthContext)
    const { data: myBuyers = [], isLoading } = useQuery({
        queryKey: ['my-order', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://used-phone-server.vercel.app/my-buyer/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('usePhonsToken')}`
                }
            });
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className=' mb-36 min-h-screen'>
            <h2 className="text-3xl text-center bg-slate-900 text-white py-6">Total Buyers: {myBuyers?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr >
                            <th></th>
                            <th>Buyers Name</th>
                            <th>Buyers Mobile Number</th>
                            <th>Meeting Location</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myBuyers?.length &&
                            myBuyers.map((buyer, i) => <tr
                                key={buyer._id}
                                className="hover"
                            >
                                <th>{i + 1}</th>
                                <td>{buyer.buyerName}</td>
                                <td>{buyer.buyerMobile}</td>
                                <td>{buyer.meetingLocation}</td>
                                <td>{buyer.price}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBuyers;