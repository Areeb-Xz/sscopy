# SplitSmart (sscopy) - Project Status & Documentation
**York University EECS3311 Group Project**  
**Last Updated:** November 19, 2025  
**Repository:** https://github.com/Areeb-Xz/sscopy

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Current Implementation Status](#current-implementation-status)
3. [Technology Stack](#technology-stack)
4. [Team Structure](#team-structure)
5. [Completed Features](#completed-features)
6. [In-Progress Features](#in-progress-features)
7. [Known Issues & Fixes](#known-issues--fixes)
8. [What's Left to Complete](#whats-left-to-complete)
9. [Architecture & File Structure](#architecture--file-structure)
10. [Next Steps & Timeline](#next-steps--timeline)

---

## Project Overview

**SplitSmart** is a full-stack web application for group expense tracking and bill-splitting. It enables users to create groups, track shared expenses, and automatically calculate who owes whom.

### Key Features:
- User authentication with JWT tokens
- Create and manage expense groups
- Track shared expenses with equal/custom splitting
- Real-time balance calculations
- Group member management
- Expense history and visualization

---

## Current Implementation Status

### Sprint 2 Progress: **~70% Complete**

| Feature | Status | Notes |
|---------|--------|-------|
| **User Authentication** | ✅ Complete | Login, signup, JWT tokens working |
| **Group Management** | ✅ Complete | Create groups, add members, view members |
| **Profile Management** | ✅ Complete | Edit profile, password changes, real-time updates |
| **Expense Tracking** | 🟡 Partial | CRUD works, but splits need implementation |
| **Balance Calculation** | 🟡 Partial | Basic calculations working, visual display improved |
| **Member List Display** | ✅ Complete | Shows group members with avatars on Expense page |
| **Invite Members** | 🟡 In Progress | UI added, backend integration ready |
| **Income Tracking** | ❌ Not Started | Backend routes empty, frontend missing |
| **Settlement System** | ❌ Not Started | No recommendations or settlement tracking |
| **Reports/Analytics** | ❌ Not Started | No charts, exports, or analytics |

---

## Technology Stack

### Frontend
- **React 18** with Vite (fast build tool)
- **React Router** for navigation
- **React Context API** for state management
- **Axios** for API calls
- **React Hot Toast** for notifications
- **React Icons** for UI elements
- **Moment.js** for date formatting

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** (jsonwebtoken) for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Development
- **Nodemon** for backend hot-reload
- **ESLint** for code quality
- **Git/GitHub** for version control
- **npm/package manager**

---

## Team Structure

| Name | Role | Responsibilities |
|------|------|------------------|
| **Mohammad Areeb** | Backend Developer\Lead | Express.js API, MongoDB, business logic |
| **Prabhkrit Singh** | Frontend Developer | React components, UI/UX, styling |
| **Samarjeet Singh** | Database/DevOps | MongoDB schema, API architecture |

---

## Completed Features

### 1. Authentication System ✅
- User registration with email validation
- User login with JWT token generation
- Password hashing with bcrypt
- Protected routes with auth middleware
- Auth context for global state management
- **Files:** `authController.js`, `authRoutes.js`, `AuthContext.jsx`, `Login.jsx`, `SignUp.jsx`

### 2. User Profile Management ✅
- Update profile (name, email)
- Change password functionality
- Real-time header updates after profile changes
- Profile edit modal
- **Files:** `Home.jsx`, `authController.js` (with `updateProfile`, `changePassword`)

### 3. Group Management ✅
- Create new groups
- View all user's groups
- View group details
- Add members by email
- View group members with avatars
- Delete groups
- **Files:** `groupController.js`, `Group.js`, `groupService.js`, `Home.jsx`

### 4. Expense UI & Display ✅
- Expense listing page with group selector
- Create expense modal
- Expense list with edit/delete options
- Group members display with avatars and avatars
- Balance summary cards
- **Files:** `Expense.jsx`, `expenseController.js`, `Expense.js`

### 5. Frontend Infrastructure ✅
- Navigation layout
- Protected routes
- Authentication context
- Global error handling (partial)
- Responsive design
- **Files:** `ProtectedRoute.jsx`, `AuthLayout.jsx`, `App.jsx`

---

## In-Progress Features

### 1. Expense Creation with Proper Splits 🟡
**Status:** Needs backend integration
- Backend requires `splits` array in expense creation
- Frontend needs to fetch group members and calculate splits
- Equal splitting algorithm ready
- **To Do:** Calculate splits array before sending to API

### 2. Member Invitation System 🟡
**Status:** UI complete, backend integration ready
- "Invite Member" button added next to "Add Expense"
- Modal for email input
- Form validation
- Backend has `addMember` function ready
- **To Do:** Connect modal to API call

### 3. Balance Calculations 🟡
**Status:** Partially working
- Backend calculates balances correctly
- Frontend displays balances
- Fixed undefined `.toFixed()` error
- Still needs optimization for settlement recommendations
- **To Do:** Add settlement recommendations UI

---

## Known Issues & Fixes

### ✅ Fixed Today:
1. **API Proxy Issue** - Added Vite proxy configuration
2. **Profile Update Not Refreshing** - Added `updateUser()` to AuthContext
3. **Undefined Balance Error** - Fixed with nullish coalescing operator
4. **MongoDB _id vs id** - Fixed React key warnings by using `_id` instead of `id`
5. **setShowModal Error** - Corrected to `setShowCreateModal`

### 🔴 Still Needs Attention:
1. **Income Feature Missing** - Complete backend and frontend implementation needed
2. **Settlement System** - No settlement recommendations or tracking
3. **Expense Splits Logic** - Frontend not building splits array for expense creation
4. **Error Boundaries** - No React error boundary for graceful error handling
5. **Loading States** - Some API calls lack loading indicators

---

## What's Left to Complete

### Priority 1: Core Sprint 2 Features (High)

#### A. Fix Expense Creation (1-2 hours)
```javascript
// Frontend needs to:
1. Fetch group members when creating expense
2. Calculate equal split amount: amount / memberCount
3. Build splits array with each member
4. Mark payer as isPaid: true, others as isPaid: false
5. Include splits in API request
```

#### B. Add Member Invitation (1 hour)
```javascript
// Connect modal to groupService.addMember()
// Show success/error toast
// Refresh group members list after adding
```

#### C. Implement Income Feature (6-8 hours)
- Create `incomeController.js` with CRUD operations
- Create `incomeRoutes.js` and register in `server.js`
- Create `incomeService.js` (frontend)
- Create `Income.jsx` page
- Add navigation route

### Priority 2: Sprint 2 Enhancements (Medium)

#### D. Settlement System (4-5 hours)
- Calculate optimal settlements (minimize transactions)
- Settlement recommendation UI
- Mark settlements as complete
- Settlement history tracking

#### E. Dashboard Improvements (2-3 hours)
- Add expense charts (Chart.js or Recharts)
- Category breakdown visualization
- Monthly trends
- Income vs. Expense comparison

#### F. Advanced Split Options (2-3 hours)
- Split type selector (Equal, Custom, Percentage)
- Custom split input UI
- Percentage-based calculation
- Split validation

### Priority 3: Polish & Testing (Low)

#### G. Filtering & Search (1-2 hours)
- Filter expenses by date range
- Filter by category
- Search by description
- Sort options (date, amount, category)

#### H. Testing (2-3 hours)
- Test expense creation with splits
- Test balance calculations
- Test member invitation
- Test income tracking

---

## Architecture & File Structure

### Backend Structure
```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Login, register, profile
│   ├── expenseController.js     # Expense CRUD & balance calc
│   ├── groupController.js       # Group management
│   └── incomeController.js      # (EMPTY - needs implementation)
├── middleware/
│   └── authMiddleware.js        # JWT verification
├── models/
│   ├── User.js
│   ├── Group.js
│   ├── Expense.js
│   └── Income.js                # Defined but not used
├── routes/
│   ├── authRoutes.js
│   ├── groupRoutes.js
│   ├── expenseRoutes.js
│   └── incomeRoutes.js          # (EMPTY - needs implementation)
├── .env                         # Environment variables
├── server.js                    # Express app entry
└── package.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx      # Global auth state
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Home.jsx         # Dashboard home
│   │   │   └── Expense.jsx      # Expense tracking
│   │   └── Auth/
│   │       ├── Login.jsx
│   │       └── SignUp.jsx
│   ├── services/
│   │   ├── authService.js
│   │   ├── groupService.js
│   │   ├── expenseService.js
│   │   └── incomeService.js     # (MISSING)
│   ├── components/
│   │   ├── Modal.jsx
│   │   ├── Input.jsx
│   │   └── ProtectedRoute.jsx
│   ├── utils/
│   │   ├── api.js               # Axios instance
│   │   └── helper.js
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js               # Vite configuration with proxy
└── package.json
```

---

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Group Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  admin: ObjectId (ref: User),
  members: [{
    user: ObjectId (ref: User),
    joinedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Collection
```javascript
{
  _id: ObjectId,
  group: ObjectId (ref: Group),
  description: String,
  amount: Number,
  payer: ObjectId (ref: User),
  category: String (Food, Travel, Utilities, Other),
  date: Date,
  splits: [{
    user: ObjectId (ref: User),
    amount: Number,
    isPaid: Boolean
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Next Steps & Timeline

### This Week (Nov 19-24)
**Goal:** Complete Sprint 2 core functionality

**Day 1-2 (Today-Tomorrow):**
- [x] Fix profile update real-time refresh
- [x] Add member list display on Expense page
- [x] Add "Invite Member" button
- [ ] Fix expense creation with splits array
- [ ] Test member invitation flow

**Day 3-4:**
- [ ] Implement Income backend (controller, routes)
- [ ] Implement Income frontend (service, page)
- [ ] Test income CRUD operations

**Day 5:**
- [ ] Integration testing
- [ ] Bug fixes
- [ ] Sprint 2 review & documentation

### Next Week (Nov 25 - Dec 1)
**Goal:** Enhancements and Sprint 3 planning

- Settlement system implementation
- Dashboard analytics
- Advanced split options
- Testing and refinement

---

## How to Continue Development

### Running the Application
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### Important Notes
1. **MongoDB _id vs id:** Use `_id` for React keys (not `id`)
2. **Vite Proxy:** Backend API calls go to `/api/*` and proxy to `http://localhost:3000`
3. **Auth Context:** Use `useAuth()` hook in components to access user and auth functions
4. **Expense Splits:** Backend requires splits array - frontend must calculate and include it

### Key Files to Know
- **Authentication:** `authController.js`, `AuthContext.jsx`
- **Groups:** `groupController.js`, `groupService.js`
- **Expenses:** `expenseController.js`, `Expense.jsx`
- **API Config:** `api.js` (Axios instance with proxy)
- **Environment:** `.env` (MongoDB URI, JWT secret)

---

## Git Workflow
```bash
# Always pull before starting
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Commit regularly
git add .
git commit -m "descriptive message"

# Push and create PR
git push origin feature/your-feature-name
```

---

## Quick Reference: API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/me` - Update profile
- `POST /api/auth/change-password` - Change password

### Groups
- `POST /api/groups` - Create group
- `GET /api/groups` - Get user's groups
- `GET /api/groups/:id` - Get group details
- `POST /api/groups/:id/members` - Add member
- `DELETE /api/groups/:id/members/:userId` - Remove member

### Expenses
- `POST /api/expenses` - Create expense
- `GET /api/expenses/group/:groupId` - Get group expenses
- `GET /api/expenses/group/:groupId/balance` - Get balances
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

---

## Contact & Questions
For questions or issues, reach out to the team or create GitHub issues in the repository.

**Last Updated:** November 19, 2025  
**Document Version:** 2.0 (Updated after Session 2)