# NodeJS + PostgreSQL + Express

## Description

This is a simple NodeJS + PostgreSQL + Express application that allows you to create, read, update and delete blogs.

## Installation

1. Clone the repository
2. Run `yarn`
3. Run `yarn dev`

## Usage

1. Create a blog by sending a POST request to `http://localhost:3000/blogs` with the following body:

```json
{
    "title": "My first blog",
    "content": "This is my first blog",
    "author": "Akshat Mittal"
}
```

2. Get all blogs by sending a GET request to `http://localhost:3000/blogs`
3. Get a blog by sending a GET request to `http://localhost:3000/blogs/:id`
4. Update a blog by sending a PUT request to `http://localhost:3000/blogs/:id` with the following body:

```json
{
    "title": "My first blog",
    "content": "This is my first blog",
    "author": "Akshat Mittal"
}
```

5. Delete a blog by sending a DELETE request to `http://localhost:3000/blogs/:id`

## License

[MIT](LICENSE)

## Author

[Akshat Mittal](https://akshatmittal61.vercel.app/)

