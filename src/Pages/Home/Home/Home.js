import React from 'react';
import Categories from '../Categories/Categories';
import HomeAbout from '../HomeAbout/HomeAbout';
import HomeHeader from '../HomeHeader/HomeHeader';


const Home = () => {
    return (
        <div>
            <HomeHeader></HomeHeader>
            <Categories></Categories>
            <HomeAbout></HomeAbout>
        </div>
    );
};

export default Home;