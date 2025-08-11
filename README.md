# RBAC React Management System 🔐

A modern Role-Based Access Control (RBAC) system built with React, featuring a clean UI and comprehensive product management capabilities.

## 🌐 Live Demo
[https://react-rbac-rust.vercel.app/](https://react-rbac-rust.vercel.app/)

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rbac-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 👥 User Roles & Permissions

### 🔴 Admin
- **Full access** to all features and settings
- **Create** new products
- **Edit** existing products
- **Delete** products
- **View** all products and data
- Access to admin dashboard

### 🟡 Editor
- **Edit** existing products
- **Delete** products
- **View** all products and data
- Limited administrative access

### 🟢 Viewer
- **View** and read content only
- **Browse** all products
- **Read** product details and attributes
- **No editing** or deletion capabilities
- **No creation** permissions

## 🏗️ System Features

### Authentication & Authorization
- Role-based login system
- Protected routes based on user roles
- Secure session management
- Automatic role-based navigation

### Product Management
- **CRUD Operations**: Create, Read, Update, Delete products
- **Dynamic Attributes**: Add custom key-value pairs to products
- **Local Storage**: Offline data persistence
- **API Integration**: Sync with external backend services
- **Data Merging**: Smart merge between local and API data

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with dark theme
- **Bootstrap Integration**: Consistent styling and components
- **Role-based UI**: Different interfaces based on user permissions
- **Modal Windows**: Intuitive forms for creating and editing

## 🔧 Technology Stack

- **Frontend**: React 19.1.1
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5.3.7 + Custom CSS
- **Icons**: React Icons
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Icons/          # Custom icon components
│   ├── Modals/         # Modal components (Create, Edit, Delete)
│   ├── Buttons.jsx     # Button components
│   ├── NavBar.jsx      # Navigation component
│   └── Tables.jsx      # Table component
├── context/            # React Context for state management
│   ├── context.js      # Context definition
│   ├── ContextProvider.jsx  # Context provider
│   └── ProtectedRoute.jsx   # Route protection
├── pages/              # Page components
│   ├── AdminPage.jsx   # Admin dashboard
│   ├── EditorPage.jsx  # Editor dashboard
│   ├── ViewerPage.jsx  # Viewer dashboard
│   ├── LoginPage.jsx   # Login interface
│   └── UnauthorizedPage.jsx  # Access denied page
├── services/           # API and data services
│   └── ProductServices.js  # Product CRUD operations
└── assets/             # Static assets (images, icons)
```

## 🛡️ Security Features

- **Role Validation**: Server-side and client-side role verification
- **Protected Routes**: Automatic redirection based on permissions
- **Session Management**: Secure user session handling
- **Access Control**: Granular permissions for different operations

## 🎨 Customization

The application uses CSS custom properties for easy theming. Key variables are defined in `src/theme.css`:

```css
:root {
  --primary: #2563eb;
  --secondary: #1e40af;
  --dark: #0f172a;
  --text-primary: #f8fafc;
  /* ... more variables */
}
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with all capabilities
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Compact design with collapsible navigation
