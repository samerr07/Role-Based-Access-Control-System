# User Management Dashboard

A modern, responsive React dashboard for managing users and roles with a clean, professional UI built using `shadcn/ui` components and Tailwind CSS.

## Live Demo : https://incredible-twilight-cd2c0c.netlify.app/

---

## Features

### User Management

- **CRUD Operations**  
  - View, create, edit, and delete users.

- **Sorting and Filtering**  
  - Sort users by fields like name, email, status, or date.  
  - Filter users by status, role, or date range.

- **Search**  
  - Real-time search by name or email.

- **Persistent Storage**  
  - Uses `localStorage` for data retention.

- **Real-Time Updates**  
  - Instant updates to user data.

- **Last Login Tracking**  
  - Track and display the last login timestamp for each user.

---

### Role Management

- **Custom Roles**  
  - Create and manage roles with custom permissions.

- **Permissions**  
  - Assign granular permissions (read, write, delete).

- **Role Descriptions**  
  - Add or edit role descriptions.

- **Visual Permission Indicators**  
  - Clear, visual display of role permissions.

- **Role-Based Access Control**  
  - Manage access to features and data based on roles.

---

### UI/UX Features

- **Modern Design**  
  - Gradient-enhanced, clean layout.

- **Responsive Layout**  
  - Fully optimized for mobile, tablet, and desktop devices.

- **Interactive Data Tables**  
  - Sortable, searchable tables with real-time updates.

- **Modal Dialogs**  
  - Clean, accessible modals for data entry and editing.

- **Status Badges**  
  - Color-coded badges for user statuses.

- **Animated Transitions**  
  - Smooth transitions for a polished experience.

- **Filter Panel Toggle**  
  - Hide or show the filter panel as needed.

- **Search Functionality**  
  - Integrated search with real-time updates.

---

## Tech Stack

- **React** (with Hooks)  
- **Tailwind CSS**  
- **shadcn/ui Components**  
- **Lucide Icons**  
- `localStorage` for data persistence  

---

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher)  
- **npm** or **yarn**

---

## Usage

### Managing Users

#### Adding a User:
1. Click the **"Add User"** button.  
2. Fill in the required fields (name, email, role, status).  
3. Click **"Add User"** to save.

#### Editing a User:
1. Click the **pencil icon** next to the user.  
2. Modify the desired fields.  
3. Click **"Update User"** to save changes.

#### Deleting a User:
1. Click the **trash icon** next to the user.  
2. Confirm the deletion.

#### Filtering Users:
1. Click the **"Filters"** button to show filter options.  
2. Select desired filters for status, role, or date range.  
3. Results update automatically.

#### Searching Users:
1. Use the **search bar** to filter users by name or email.  
2. Results update in real-time as you type.

---

### Managing Roles

#### Adding a Role:
1. Click the **"Add Role"** button.  
2. Enter the role name and description.  
3. Select permissions.  
4. Click **"Add Role"** to save.

#### Editing a Role:
1. Click the **pencil icon** next to the role.  
2. Modify the desired fields.  
3. Click **"Update Role"** to save changes.

#### Deleting a Role:
1. Click the **trash icon** next to the role.  
2. Confirm the deletion.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
