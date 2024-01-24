<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://portfolio-website-joaquin-m2.vercel.app/">
    <img src="public\JM2-Backend.png" alt="Logo">
  </a>

  <h3 align="center">Joaquin-M2 portfolio website - Backend</h3>

  <p align="center">
    Backend repository of my portfolio website
    <br />
    <a href="https://github.com/Joaquin-M2/portfolio-website"><strong>Explore the frontend »</strong></a>
    <br />
    <br />
    <a href="https://portfolio-website-joaquin-m2.vercel.app/tools">Visit Website</a>
    ·
    <a href="https://portfolio-website-joaquin-m2.vercel.app/contact">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
        <a href="#endpoints">Endpoints</a>
        <ul>
            <li><a href="#users">Users</a></li>
            <li><a href="#tools">Tools</a></li>
            <li><a href="#tags">Tags</a></li>
            <li><a href="#icons">Icons</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>This project was originally born as a need for the "Tools" section of my personal website. Soon after, I started to use it as a small playground to experiment with backend code, such as the different alternatives to authenticate users. In the future it will also house the backend code for any project in my portfolio that may require it.</p>

<p>Therefore, this repository is not intended to show any kind of extraordinary backend code but just the minimum required by some functionalities in the frontend of my portfolio website. Nevertheless, I try to apply a clear architecture and best practices on it, so don't hesitate to let me know if you see anything that can be improved :slightly_smiling_face:.</p>

<p>This backend code is hosted at <a href="https://adaptable.io/" target="_blank">Adaptable</a> and interacts with a <a href="https://www.mongodb.com/" target="_blank">MongoDB</a> database. If you are curious about the frontend, feel free to visit <a href="https://github.com/Joaquin-M2/portfolio-website" target="_blank">its repository</a>.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Endpoints

Currently, the backend code in this repository creates 4 different endpoints: Users, Tools, Tags and Icons. Down below you can find a brief description for each of them, even though they will be documented in the future following the <a href="https://www.openapis.org/" target="_blank">OpenAPI Specification</a>.

### Users

Required for letting any visitor have their own account and save their favorite tools in the "Tools" section.

Some requests are aimed to most users (e.g. POSTing into /user/signup and /user/login) whilst some others are for administrators (e.g. PATCHing user accounts to update their role or DELETEing their account).

For more information visit the related controller and route files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Tools

Required for GETting one or every tool, creating (POSTing), updating (PATCHing) and DELETEing a tool.

Users without the "admin" role can only perform GET requests.

For more information visit the related controller and route files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Tags

Required for managing the tags that are used to filter tools.

Every user can GET every tag. Only admin users can create (POST), update (PATCH) and delete (DELETE) tags.

For more information visit the related controller and route files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Icons

Required for managing the icons that can be used for each tool.

The files for these icons are stored in this repository (/public/tools-icons) and their URL is used when creating a new icon in the database.

Every user has permissions to GET every icon. Only admin users can create (POST), update (PATCH) and delete (DELETE) icons.

For more information visit the related controller and route files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

Technologies referenced in this section are only those used just for the personal website itself, not the backend of any portfolio project that may require it:

<div align="center">
  <table>
    <thead>
      <tr>
        <th>Development</th>
        <th>Testing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://nodejs.org/" target="_blank">
            <img src="https://img.shields.io/badge/Node.js-black?style=for-the-badge&logo=node.js" />
          </a>
          <br />
          <a href="https://expressjs.com/" target="_blank">
            <img src="https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express" />
          </a>
          <br />
          <a href="https://mongoosejs.com/" target="_blank">
            <img src="https://img.shields.io/badge/Mongoose-black?style=for-the-badge&logo=mongoose" />
          </a>
        </td>
        <td>
          <a href="https://www.postman.com/" target="_blank">
            <img src="https://img.shields.io/badge/Postman-black?style=for-the-badge&logo=postman" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

If you want to setup this website (backend) in your own localhost, it is as simple as just installing the required npm packages:

```sh
npm install
```

You will also need to set up a database such as MongoDB and set the different environment variables in the `nodemon.json` file, which should be at the root of the project with the following code:

```
{
  "env": {
    "MONGODB_ATLAS_PASSWORD": "db-password",
    "JWT_KEY": "secret-key-used-for-jwt-generation"
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Document endpoints using the OpenAPI Specification
- [ ] Create tests for every endpoint
  - [ ] Users
  - [ ] Tools
  - [ ] Tags
  - [ ] Icons
- [ ] Use TypeScript

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Joaquín Moreno - [LinkedIn profile](https://www.linkedin.com/in/joaquin-m2/) - joaquin.mmol@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/joaquin-m2/
