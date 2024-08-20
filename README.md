# Personal Blog Front

This project is a modern, responsive front-end application for a personal blog, built with Angular 18.1.4. It provides a user-friendly interface for creating, viewing, and interacting with blog posts.

## Features

- View all blog posts
- Create new blog posts
- Search posts by title
- View individual post details
- Like posts
- Comment on posts
- Responsive design for mobile and desktop

## Technologies Used

- Angular 18.1.4
- Angular Material
- RxJS
- TypeScript

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/personal-blog-front.git
   ```
2. Navigate to the project directory:
   ```
   cd personal-blog-front
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Project Structure

- `src/app/components`: Contains all Angular components
- `src/app/services`: Contains services for API communication
- `src/app/modules`: Contains custom Angular modules
- `src/app/pipes`: Contains custom pipes

## Key Components

- `CreatePostComponent`: Allows users to create new blog posts
- `ViewAllPostComponent`: Displays a list of all blog posts
- `ViewPostComponent`: Shows details of a single blog post
- `SearchPostComponent`: Enables users to search for posts by title

## Services

- `PostService`: Handles all API calls related to blog posts
- `CommentService`: Manages API calls for post comments

## Styling

The project uses Angular Material for UI components and custom SCSS for additional styling. The global styles can be found in `src/styles.scss`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
