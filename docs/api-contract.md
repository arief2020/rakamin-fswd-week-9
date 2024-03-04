# Movies

- Movies object

```
{
    id: 1,
    title: "Reckless",
    genres: "Comedy|Drama|Romance",
    year: "2001"
}
```

## **GET /api/movies**

Returns all movies in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:**

```
message: "Success Get All Movie",
data: [
    {<movies_object>},
    {<movies_object>},
    {<movies_object>}
]
```

## **GET /api/movies/:id**

Returns the specific category.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:** 
```
message: "Success Get Movie By Id",
data: [
    {<movies_object>},
]
```
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message: "Movies not found" }`

## **POST /api/movies**

Returns all movies in the system.

- **URL Params**  
  None
- **Data Params**  
```
  {
    title: string,
    genres: string,
    year: string
  }
```

- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:**

```
message: "Success Create Movie",

```




## **PUT /api/movie/:id**

Update movies by id.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
```
  {
    title: string,
    genres: string,
    year: string
  }
```

- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:**

```
message: "Success Update Movie",

```

## **DELETE /api/movies/:id**

delete movies by id.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:** 
```
message: "Success Delete Movies",

```
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message: "Movies not found" }`


# Users

- Users object

```
{
    id: 1,
    title: "Reckless",
    genres: "Comedy|Drama|Romance",
    year: "2001"
}
```

## **GET /api/users**

Returns all users in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:**

```
message: "Success Get All users",
data: [
    {<users_object>},
    {<users_object>},
    {<users_object>}
]
```

## **GET /api/users/:id**

Returns the specific category.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:** 
```
message: "Success Get Users By Id",
data: [
    {<movies_object>},
]
```
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message: "Movies not found" }`

## **POST /api/users**

Returns all movies in the system.

- **URL Params**  
  None
- **Data Params**  
```
  {
    email: string,
    password: bycript(string),
    role: string,
    gender: string
  }
```

- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:**

```
message: "Success Register User",

```

## **PUT /api/users/:id**

Update movies by id.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
```
  {
    email: string,
    password: bycript(string),
    role: string,
    gender: string
  }
```

- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:**

```
message: "Success Update Users",

```

## **DELETE /api/users/:id**

delete users by id.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  - Content-Type: application/json
  - Authorization: Bearer JWT Token
- **Success Response:**
- **Code:** 200  
  **Content:** 
```
message: "Success Delete Users",

```
- **Error Response:**
- **Code:** 404  
  **Content:** `{ message: "Users not found" }`


## **POST /api/login**

API for login users.

- **URL Params**  
  None
- **Data Params**  
```
  {
    email: string,
    password: bycript(string),
  }
```

- **Headers**  
  - Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  message: "Success Login",
  accessToken: JWT token,
}

```
