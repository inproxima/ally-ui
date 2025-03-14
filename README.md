# Prompt Management System

A React-based UI for managing and customizing AI prompt templates.

## Features

- Create, edit, and delete function configurations
- Customize system and user prompts with a rich editor
- Test prompt execution with a preview feature
- Manage variable tokens for dynamic prompt generation
- Persistent configuration storage

## Deployment to Render

### Option 1: Deploy as a Static Site

1. Sign up for a [Render account](https://render.com/) if you don't have one.

2. From the Render dashboard, click "New" and select "Static Site".

3. Connect your GitHub repository or upload your code directly.

4. Configure your static site with the following settings:
   - **Name**: prompt-management-system (or your preferred name)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**: Add any environment variables if needed

5. Click "Create Static Site".

6. Render will automatically build and deploy your application. Once complete, you can access it at the provided URL.

### Option 2: Deploy with Docker

1. Create a `Dockerfile` in your project root:

```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create an `nginx.conf` file:

```
server {
    listen 80;
    server_name _;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

3. From the Render dashboard, click "New" and select "Web Service".

4. Connect your GitHub repository or upload your code directly.

5. Configure your web service with the following settings:
   - **Name**: prompt-management-system (or your preferred name)
   - **Environment**: Docker
   - **Region**: Choose the region closest to your users
   - **Branch**: main (or your preferred branch)
   - **Plan**: Free (or choose a paid plan for more resources)

6. Click "Create Web Service".

7. Render will automatically build and deploy your Docker container. Once complete, you can access it at the provided URL.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

To build the app for production, run:

```
npm run build
```

This creates a `build` folder with the optimized production build.

## Dependencies

- React
- Material-UI
- Monaco Editor
- UUID

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
