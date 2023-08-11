
# MFA Snippet

## What is it?

A simple POC to demonstrate how to implement a MFA system using NextJS.

## Run Locally

1. Clone the project 

2. Go to the project directory

```bash
  cd mfa_snippet
```

3. Install dependencies

```bash
  npm install
```

4. Copy the .env.example file and rename it to .env

```bash
  cp .env.example .env
```

5. Run the app

```bash
  npm run dev
```

6. Start MongoDB (version 6.0.6 was used for this project)

Make sure to create the data/db folder in your home directory or just change the path to your desired location, but be aware that you will need to change it in the .env file as well.

```bash
    sudo mongod --port 3333 --dbpath ~/data/db
```
## Author

- [@flobbun](https://www.github.com/flobbun)

