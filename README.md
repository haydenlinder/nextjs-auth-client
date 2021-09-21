# Jobtron Client

Frontend client for Jobtron users.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running Locally

### 0. Prerequisites:
  - [jobtron-auth-server](https://github.com/haydenlinder/nodejs-hasura-server)
    - [jobtron-graphql-engine](https://github.com/haydenlinder/jobtron-graphql-engine)

### 1. Start the server:
```bash
npm install
NEXT_PUBLIC_AUTH_URL=http://localhost:8081 npm run dev
```

## Environment Variables:
  - `NEXT_PUBLIC_AUTH_URL=http://localhost:8081` (or wherever [jobtron-graphql-engine](https://github.com/haydenlinder/nodejs-hasura-server) is deployed)

