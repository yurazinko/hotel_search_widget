# Hotel Search Widget (BoomNow Integration)

Simplified hotel search application built with **Ruby on Rails 8** (Monolith) and **React**, integrating with the **BoomNow Open API**.

## Features
- **Monolithic Architecture**: Rails handles routing and API proxying, React handles the UI.
- **Auto-Auth Client**: Custom Ruby service that handles OAuth2 handshake (`client_credentials`) automatically.
- **React Frontend**: Modern functional components with Hooks and CSRF protection.
- **Raw JSON Output**: Displays original API response as per technical requirements.

---

## Prerequisites
Ensure you have the following installed:
- **Ruby 3.2.0+**
- **Node.js 18+** & **Yarn**
---

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd hotel_search_widget
```

### 2. Install dependencies
Install Ruby gems and JavaScript packages:

```bash
bundle install
yarn install
```

### 3. Environment Configuration
Create a .env file in the root directory and add your BoomNow credentials:

```bash
touch .env
```
And add the following content:

```
BOOM_NOW_API_ID=<your API ID>
BOOM_NOW_API_SECRET=<your API secret>
BOOM_NOW_BASE_URL=https://app.boomnow.com/open_api/v1/
```

### 4. Database Setup

```bash
bin/rails db:prepare
```

## Running the Application

This project uses foreman to run the Rails server and esbuild watcher simultaneously.

```bash
bin/dev
```

Once started, navigate to  [http://localhost:3000](http://localhost:3000)