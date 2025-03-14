# Prompt Management System

A comprehensive UI for managing and customizing AI prompt templates. This application allows you to create, edit, and test prompts for various AI models from OpenAI and Anthropic.

## Features

- Create and manage function-based prompt templates
- Edit system and user prompts with a rich code editor
- Test prompts with real AI models
- View token usage statistics
- Support for multiple AI providers (OpenAI and Anthropic)
- Variable substitution in prompts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API keys for OpenAI and/or Anthropic

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/prompt-management-system.git
cd prompt-management-system
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```
REACT_APP_OPENAI_API_KEY=your_openai_api_key
REACT_APP_ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Start the development server:
```
npm start
```

## API Integration

This application integrates with the following AI providers:

### OpenAI

- Models supported:
  - GPT-4o
  - GPT-4o (2024-08-06)
  - GPT-3.5 Turbo

### Anthropic

- Models supported:
  - Claude 3 Opus
  - Claude 3 Sonnet
  - Claude 3 Haiku

## Environment Variables

The following environment variables are used:

- `REACT_APP_OPENAI_API_KEY`: Your OpenAI API key
- `REACT_APP_ANTHROPIC_API_KEY`: Your Anthropic API key

## Deployment

### Deploying to Render

1. Sign up for a [Render account](https://render.com/) if you don't have one.

2. From the Render dashboard, click "New" and select "Static Site".

3. Connect your GitHub repository or upload your code directly.

4. Configure your static site with the following settings:
   - **Name**: prompt-management-system (or your preferred name)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**: Add your API keys as environment variables

5. Click "Create Static Site".

6. Render will automatically build and deploy your application. Once complete, you can access it at the provided URL.

## Usage

1. **Creating a New Function**:
   - Click the "+" tab to create a new function
   - Fill in the function properties
   - Edit the system and user prompts
   - Save the function

2. **Testing a Function**:
   - Select the function from the tabs
   - Click "Run Test" to test the function with sample data
   - View the results and token usage statistics

3. **Editing a Function**:
   - Select the function from the tabs
   - Edit the function properties and prompts
   - Click "Save" to save your changes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [OpenAI API](https://openai.com/api/)
- [Anthropic API](https://www.anthropic.com/)

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
