import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const { data: myOrders = [], isLoading } = useQuery({
        queryKey: ['my-order'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/my-orders/${user?.email}`);
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(myOrders)
    return (
        <div className='max-w-[1440px] mx-auto my-16 mb-36 min-h-screen'>
            <h2 className="text-3xl text-center bg-slate-900 text-white py-6">Total Order: {myOrders?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr >
                            <th></th>
                            <th>Product Name</th>
                            <th>Seller Name</th>
                            <th>Seller Mobile Number</th>
                            <th>Meeting Location</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((order, i) => <tr
                                key={order._id}
                                className="hover"
                            >
                                <th>{i + 1}</th>
                                <td>{order.productName}</td>
                                <td>{order.sellerName}</td>
                                <td>{order.sellerMobile}</td>
                                <td>{order.meetingLocation}</td>
                                <td>{order.price}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;