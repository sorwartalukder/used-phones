import React from 'react';

const Blog = () => {
    return (
        <div className='max-w-[1440px] min-h-screen  mx-auto my-14 text-justify'>
            <div className=' my-10'>
                <h2 className='text-4xl mb-5'>What are the different ways to manage a state in a React application?</h2>
                <p className='text-2xl'>
                    Every React component has a built-in state. This state is an object which stores the property values that belong to a component. State is able to keep data from different components in-sync because each state update re-renders all relevant components.
                </p>
            </div>
            <div className=' my-10'>
                <h2 className='text-4xl mb-5'>How does prototypical inheritance work?</h2>
                <p className='text-2xl'>
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object.
                </p>
            </div>
            <div className=' my-10'>
                <h2 className='text-4xl mb-5'>What is a unit test? Why should we write unit tests?</h2>
                <ul className='text-2xl'>
                    <li>
                        Unit test: Unit Testing is a type of software testing where individual units or components of a software are tested.
                    </li>
                    <li>
                        Unit testing ensures that all code meets quality standards before its deployed. This ensures a reliable engineering environment where quality
                    </li>
                </ul>
            </div>
            <div className=' my-10'>
                <h2 className='text-4xl mb-5'>React vs. Angular vs. Vue?</h2>
                <ul className='text-2xl'>
                    <li>
                        Virtual DOM implementation and various rendering optimizations
                        make it too fast.re individual units or components of a software are tested.
                    </li>
                    <li>
                        One way data binding available with less complexity.
                    </li>
                    <li>Migration between versions is effortless. </li>
                    <li>Best choice for cross-platform and mobile apps.</li>
                    <li>Angular uses HTML and CSS.</li>
                    <li> Suitable for detailed documentation, large scale, and productive
                        applications.</li>
                    <li>Google long term support available. </li>
                    <li>  It is easily integrated, lightweight, and easy to learn for a
                        beginner.</li>
                    <li> Vue support both one way and two-way data binding.</li>
                    <li>Provides better performance, comparing to others.</li>
                    <li>For small projects, Vue is the best option.</li>
                </ul>
            </div>
        </div>
    );
};

export default Blog;