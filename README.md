# Tech-Blog

## Description

The Tech Blog is a CMS-style blog site that runs Node.js, Express, and Sequelize to access a SQL database on the server side, and utilizes the Express-Handlebars package to generate views for the client side. The site has the ability for users to create an account and log in, make posts, view other users posts, add a comment to existing posts, and update and delete their own posts. The user, post, and comment data is all saved in the SQL database using Sequelize. The site also uses the Express-Session package to create a server side cookie that stores the user data and expires after 10 minutes, logging out the user.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Questions](#questions)

## Installation

The site is currently deployed on Heroku at [max-tech-blog.herokuapp.com](https://max-tech-blog.herokuapp.com).

## Usage

To use the site, navigate to [max-tech-blog.herokuapp.com](https://max-tech-blog.herokuapp.com). The homepage will present a list of all posts currenlty available in the database. To log in, click the Login link. If they user does not yet have an account, they will click "Sign up instead" and enter a new username, email, and password. Upon submiting, the user will be logged in and redirected to the Dashboard, which shows all the logged in user's posts.

To create a new post, click "New Post" from the Dashboard. The user will be redirected to a page with inputs for title and post content. Upon submission, the user will be redirected to the page for that new post. When viewing their own post or someone else's post, a logged-in user has the ability to add a comment by clicking the "Leave Comment" button. The page will produce a form input to leave a comment, and upon submission the comment will be added to the post.

If a user is viewing one of their own commments, they user also has the ability to update or delete that post. To log out, a user clicks the "Logout" link in the navbar. They will then be able to view posts on the homescreen, or view individual posts, but will not be able to post or comment.

![Usage Screenshot 1](./assets/images/tech-blog-screenshot-1.png?raw=true)

![Usage Screenshot 2](./assets/images/tech-blog-screenshot-2.png?raw=true)
  
![Usage Screenshot 3](./assets/images/tech-blog-screenshot-3.png?raw=true)

## Features

- CMS-style blog to talk with other users about technology
- Abilitly to create account and log in.
- Logged-in users can create new posts, update or delete their own existing posts, and comment on any post.
- Persistent data stored in a SQL database
- Heroku deployment that can be accessed from any web browser

## Questions

If you have additional questions, please contact me at: max.mcdonough@gmail.com

Github: [MMMPhoto](https://github.com/MMMPhoto)
  
[Github Repo for this Application](https://github.com/MMMPhoto/Tech-Blog)

[Heroku deployment for this Application](https://max-tech-blog.herokuapp.com)

--------------------------------------

### &copy; 2022 Max McDonough
