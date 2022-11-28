import React from 'react';
import AdvertisedProducts from '../AdvertisedProducts/AdvertisedProducts';
import Categories from '../Categories/Categories';
import HomeAbout from '../HomeAbout/HomeAbout';
import HomeHeader from '../HomeHeader/HomeHeader';


const Home = () => {

    return (
        <div>
            <HomeHeader></HomeHeader>
            <Categories></Categories>
            <AdvertisedProducts></AdvertisedProducts>
            <HomeAbout></HomeAbout>
        </div>
    );
};

export default Home;