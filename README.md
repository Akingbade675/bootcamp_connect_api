<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">bootcamp_connect_api</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
    <br> 
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Deployment](#deployment)
-   [Usage](#usage)
-   [Built Using](#built_using)
-   [TODO](../TODO.md)
-   [Contributing](../CONTRIBUTING.md)
-   [Authors](#authors)
-   [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Bootcamp Connect API is a backend web application that serves as the core of the Bootcamp Connect platform. It provides RESTful APIs to handle user authentication, bootcamp management, and course associations. The API supports role-based access control, allowing publishers and admins to manage bootcamps and courses efficiently.

The project is designed using Clean Architecture principles, ensuring maintainable and scalable code. It aims to connect users with nearby bootcamps offering various courses, providing a seamless learning experience.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

```
Clone the repository: `git clone <repository_url>`
Install dependencies: npm install
Set up your MongoDB database and configure the connection in config/config.env
Run the application: npm start
```

### API Endpoints

What things you need to install the software and how to install them.

```
***Authentication***

POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/auth/me

***Bootcamps***

GET /api/v1/bootcamps
GET /api/v1/bootcamps/:id
POST /api/v1/bootcamps
PUT /api/v1/bootcamps/:id
DELETE /api/v1/bootcamps/:id


***Courses***

GET /api/v1/courses
GET /api/v1/courses/:id
POST /api/v1/bootcamps/:bootcampId/courses
PUT /api/v1/courses/:id
DELETE /api/v1/courses/:id

```

## ⛏️ Built Using <a name = "built_using"></a>

-   [MongoDB](https://www.mongodb.com/) - Database
-   [Express](https://expressjs.com/) - Server Framework
-   [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

-   [@akingbade](https://github.com/akingbade675) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

-   Hat tip to anyone whose code was used
-   Inspiration
-   References
