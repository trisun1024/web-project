# Like More Application

## Introduction

The team Like-More grouped by four members and targeting on an online community and shopping app named Like-More. With the development of modern society, the wealth of materials has increased. There are more and more ways to get different kinds of goods. With the development of communication in modern society, the communication between people has become more smooth, so that the niche interest is no longer the niche. And this app we developed is to make reasonable use of niche interests. Create a community based on this interest, so that the link between the product and the product is opened. There is no need for multi-level distributors to divide between users and products, and a perfect purchase cycle is directly formed.
Team members: (based on the alphabet)

- Haoyang Qian, haq13@pitt.edu, HAQ13
- Jing Pang, jip45@pitt.edu, JIP45
- Weihan Chen, wec85@pitt.edu, WEC85
- Zechen Wang, zew20@pitt.edu, ZEW20

## Objective

Our objective is to set up a comfortable shopping community for the customers, users have the ability to share the product through the blog with other customers, communicate with each other, even the product not included in the list of the product on our website. Through the community, we can make a research on what our user group really need, what is the hottest-topic. In addition, some kind of DIY products can not reach the producing number limitation and we don’t have the confidence in some of the products. The user information could be a hint or a motivation for us to launch a specific product or a discount if a group of people wants to buy a product requiring a reduction in the price.

We are trying to solve the problem that which product should be hit the store shelf for a brand new website that doesn’t want to sell common products. In this situation, the choice of the product and the price for it are really significant because the overconfidence or over price on a product can lead to overstock and the dismiss of a product will miss the opportunity. The community could just be the guideline for the website. Through this project, we want to learn the basic logic of developing a shopping website, how to connect with the product with the shopping cart and the transaction, what kind of information that a user could get from our website and what should be hidden. Also, we want to get full use of the technology stack that learned in class and combine them together to generate a fully working website.

## Members Contributions

#### Haoyang Qian

Responsible for web front-end UI design, presentation of products, data collection of products and the development of homepage, product page, and category product page.

#### Jing Pang

Responsible for design and develop administration and blog models. Designed the data schema, front-end interface, and sample data.

#### Weihan Chen

Responsible for the collection of the data of the product and comment, design the schema, and the development of the product detail page and the user profile page.

#### Zechen Wang

Responsible for the log in, sign up and shopping cart pages. Designed the schema, router logic and application logic for these 3 pages. Set cookies for user identification when users login successfully.

## Technical Architecture

#### Model: Express.JS

The model will process the data in our application. It should have access to the database object returned by MongoClient. Our model should also have a way to extend it, because we may want to create different types of models. We use the mongoose library to connect with MongoDB and access the data using the APIs from the library.

#### View: EJS

With using the EJS, it works well with the express JS and it is really close to the HTML format and doesn’t have to do any conversion on it. It is used to present the data on the website and write some inner logic through the HTML.

#### Controller: Express.JS, Angular

Express.JS: With using Express, we can use routers to connect the models and views, handle http requests and responses, and set and clean cookies.

Angular: We use Angular in the shopping cart page. We use angular to bind events for buttons, and set element values.

## Challenges

There are a few difficulties we met in the process of developing the web application. Design consistency is difficult to maintain. We have a group of 4 people. Every one of us has his favorite design pattern and style. Since we only have an approximate style description and no detail UI prototype, the final app UI is a little different at various sites. We sometimes reconsider some detail problems of UI to make its interactions smoother and more elegant. Matching of third-party platform accounts and our accounts’ data. When we want to log in with third-party platform accounts, we will meet the problem of having trouble matching data between our site with other sites. The user id and user name may need to be created so the schema of models can adapt to each other.

Originally we have a function “like more” that we have a vote for the product. The function mainly includes two parts, the first part is that our website has a list of the product that for users to vote and we will choose the product with the highest vote count and give it a high discount. The second part is that We first decide to add a like function to the unreleased DIY product, if a product collect enough like, we will contact the factory to produce the product to let it become a real product in our website. Also, the price of the product is provided to the user beforehand so it can be set as a reasonable one.

However, this function asks us to provide the data for unreleased products and it is really hard to get the full details. Also,we have to decide the life cycle of the product which means that the unreleased product will get out of the list for not enough people vote for it. The timestamp logic for the function to clear the data for the unreleased product is really complicated so we haven’t got it live.

The current blog supports a simple form of publishing. When developing functions, we planned to develop the following two functions: 1. Write, modify and format the content; 2. Support text format, especially markdown format support. But because these two functions are designed with a lot of extra work, and because the app is developed based on HTML and CSS, there is insufficient native support for these functions. So we did not include these two functions.

## Future Work

We think the following features are particularly interesting and worth optimizing and developing. For example, we hope to upgrade the forum function we used earlier. Existing forums only support the publishing of standard blogs. If you can let him support more text formats, such as markdown. We want to go deeper to learn how the deep neural network could work well with the front end and offers some functionality without reducing much of the performance of the website. With the development of Artificial Intelligence and make use of the community that we have in our website, we could generate a picture recognition function. we could gather our product picture as our dataset, using efficient Net built by Google as our Model and TensorFlow as our backend to train our image data. As a result, whenever the user posts a picture in the blog, if there is anyone of the products in the image, our website can recognize it, give a link to the item for the user to click and get directly to the product information page.

Also, we didn’t put the rating function on our website because we figure that sometimes rating by the user is not that reliable. In the next stage, we want to introduce a model based on the hieratical attention network or the transformer to do some sentiment analysis to mark the users’ review from one to five, more objectively reflect how it is good as expected.

Last but not the least, as to the data visualization part, including showing the performance of the product to the user, showing the product, transaction and the user information to the admin. D3.js is a great technique stack for us to go further. The customization ability of D3.JS is really strong because it has a bunch of basic API, which is very suitable for data visualization requirements.

## Conclusion

From this project, we learnt some knowledge about technologies and frameworks. Firstly, we have a deeper understanding of MVC pattern. MVC model divides the web application into 3 clearly structured sections: model, view and controller. The clear structure helps us develop and modify our app hierarchically.

We also had a better understanding of javascript, html and css. These are the fundamental knowledge for web development. We must have a solid grasp of these basic knowledge before being able to learn higher-level frameworks.

We think that basic knowledge is the most important thing. Whatever framework we choose, solid basic knowledge is the key to the project success. Also, we have to keep our head fresh to be aware of the project structure. Our job is not only coding, but also creating a meaningful product. We have to consider the user experience because the final purpose of the app is to serve users.

## Reference

<https://mongoosejs.com/docs/api/model.html>

<https://mongoosejs.com/docs/connections.html>

<https://expressjs.com/zh-cn/api.html>

<https://medium.com/@LindaVivah/the-beginners-guide-understanding-node-js-express-js-fundamentals-e15493462be1>

<https://www.geeksforgeeks.org/use-ejs-as-template-engine-in-node-js/>
