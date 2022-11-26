import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import AdvertisedProducts from '../AdvertisedProducts/AdvertisedProducts';
import Categories from '../Categories/Categories';
import HomeAbout from '../HomeAbout/HomeAbout';
import HomeHeader from '../HomeHeader/HomeHeader';


const Home = () => {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <HomeHeader></HomeHeader>
            <Categories></Categories>
            {user?.email && <AdvertisedProducts></AdvertisedProducts>}
            <HomeAbout></HomeAbout>
        </div>
    );
};

export default Home;