<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# SplitSmart (sscopy) - Project Documentation

**York University EECS3311 Group Project**
**Last Updated:** November 18, 2025
**Repository:** https://github.com/Areeb-Xz/sscopy

***

## 📋 Table of Contents

1. [Project Information](#project-information)
2. [Team Structure](#team-structure)
3. [Technical Architecture](#technical-architecture)
4. [Current Implementation Status](#current-implementation-status)
5. [Features Breakdown](#features-breakdown)
6. [Critical Issues](#critical-issues)
7. [What's Left to Complete](#whats-left-to-complete)
8. [Timeline \& Priorities](#timeline--priorities)
9. [API Endpoints](#api-endpoints)
10. [Database Schema](#database-schema)

***

## 1. Project Information

### Project Overview

**SplitSmart** is a web-based group expense tracking and bill-splitting application that enables users to:

- Create and manage expense groups
- Track shared expenses within groups
- Automatically calculate who owes whom
- Split bills equally or by custom amounts
- Track income sources
- Generate expense reports
- Settle balances between group members


### Technology Stack

**Frontend:**

- React 18+ with Vite
- React Router for navigation
- React Context API for state management
- React Hot Toast for notifications
- React Icons for UI icons
- Moment.js for date formatting
- Axios for API calls

**Backend:**

- Node.js with Express.js v5.1.0
- MongoDB with Mongoose ODM v8.20.0
- JWT (jsonwebtoken v9.0.2) for authentication
- bcryptjs v3.0.3 for password hashing
- CORS enabled for cross-origin requests
- ExcelJS v4.4.0 for report generation
- Multer v2.0.2 for file uploads

**Database:**

- MongoDB (NoSQL database)
- Collections: users, groups, expenses, incomes

**Development Tools:**

- Nodemon for backend hot-reload
- ESLint for code quality
- Git/GitHub for version control

***

## 2. Team Structure

| Name | Role | Responsibilities |
| :-- | :-- | :-- |
| **Mohammad Areeb** | Backend Developer | Express.js server, REST API endpoints, MongoDB integration, business logic |
| **Prabhkrit Singh** | Frontend Developer | React components, UI/UX, page routing, state management |
| **Samarjeet Singh** | Database \& REST API | MongoDB schema design, data relationships, API architecture |
| **You** | Project Coordinator \& Integration Lead | Frontend-backend integration, bug fixes, documentation, standup coordination |


***

## 3. Technical Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React Client  │ ◄─────► │  Express.js API │ ◄─────► │    MongoDB      │
│   (Frontend)    │  HTTP   │    (Backend)    │  CRUD   │   (Database)    │
└─────────────────┘         └─────────────────┘         └─────────────────┘
     Port: 5173                  Port: 5000
```


### Project Structure

```
sscopy/
├── BackEnd/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # ✅ Login/Register
│   │   ├── expenseController.js  # ✅ Expense CRUD
│   │   └── groupController.js    # ✅ Group management
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   ├── User.js              # ✅ User schema
│   │   ├── Group.js             # ✅ Group schema
│   │   ├── Expense.js           # ✅ Expense schema
│   │   └── Income.js            # ✅ Income schema
│   ├── routes/
│   │   ├── authRoutes.js        # ✅ Auth endpoints
│   │   ├── expenseRoutes.js     # ✅ Expense endpoints
│   │   ├── groupRoutes.js       # ✅ Group endpoints
│   │   ├── incomeRoutes.js      # ❌ EMPTY (Not implemented)
│   │   └── dashboardRoutes.js   # ⚠️ Partial
│   ├── package.json
│   └── server.js                # Main entry point
│
└── frontend/ss/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/          # Reusable UI components
    │   ├── context/
    │   │   └── AuthContext.jsx  # ✅ Auth state management
    │   ├── pages/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx    # ✅ Login page
    │   │   │   └── Register.jsx # ✅ Register page
    │   │   └── Dashboard/
    │   │       ├── Home.jsx     # ✅ Dashboard home
    │   │       ├── Expense.jsx  # ⚠️ HAS BUGS
    │   │       └── Income.jsx   # ❌ NOT IMPLEMENTED
    │   ├── services/
    │   │   ├── authService.js   # ✅ Auth API calls
    │   │   ├── expenseService.js # ✅ Expense API calls
    │   │   └── groupService.js  # ✅ Group API calls
    │   ├── utils/
    │   │   └── api.js           # Axios configuration
    │   ├── App.jsx              # Main app component
    │   └── main.jsx             # React entry point
    ├── package.json
    └── vite.config.js
```


***

## 4. Current Implementation Status

### ✅ Completed Features (70%)

**Authentication System (100%)**

- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes with auth middleware
- ✅ Auth context for global state management

**Group Management (100%)**

- ✅ Create new groups
- ✅ View all user groups
- ✅ Add/remove members
- ✅ Delete groups
- ✅ Group member validation
- ✅ Admin role for group creators

**User Profile (100%)**

- ✅ User schema with email/password
- ✅ Profile data storage
- ✅ Timestamps for creation/updates

**Database Models (80%)**

- ✅ User model with authentication
- ✅ Group model with member relationships
- ✅ Expense model with split logic
- ✅ Income model (defined but not used)


### ⚠️ Partially Completed Features (20%)

**Expense Management (75%)**

- ✅ Backend: Create/Read/Update/Delete expenses
- ✅ Backend: Calculate group balances
- ✅ Backend: Split calculation algorithms
- ✅ Frontend: Expense listing page
- ✅ Frontend: Create expense modal
- ❌ **BUG:** Text inputs lose focus after 1 character
- ❌ **BUG:** Create expense button doesn't work (missing splits field)
- ❌ Frontend: Expense editing not fully functional
- ❌ Frontend: Split type selection (equal/custom/percentage)

**Dashboard (50%)**

- ✅ Dashboard layout and navigation
- ✅ Group selector
- ✅ Expense summary cards
- ⚠️ Balance calculations display incomplete
- ❌ Settlement recommendations not implemented
- ❌ Charts/visualizations missing


### ❌ Not Implemented Features (10%)

**Income Management (0%)**

- ❌ Frontend: Income.jsx page completely missing
- ❌ Backend: incomeRoutes.js is empty
- ❌ Backend: No income controller exists
- ❌ Backend: Income routes not registered in server.js
- ❌ Service: incomeService.js doesn't exist

**Reports \& Analytics (0%)**

- ❌ Export expenses to Excel
- ❌ Generate PDF reports
- ❌ Expense filtering by date/category
- ❌ Expense charts and graphs
- ❌ Monthly/yearly summaries

**Settlement System (0%)**

- ❌ Settlement recommendations
- ❌ Simplify debt algorithm (minimize transactions)
- ❌ Mark settlements as completed
- ❌ Settlement history

**Advanced Features (0%)**

- ❌ Receipt image uploads
- ❌ Multi-currency support
- ❌ Expense notifications
- ❌ Email reminders
- ❌ Search and filter expenses

***

## 5. Features Breakdown

### Feature Completion Matrix

| Feature Category | Progress | Status | Priority |
| :-- | :-- | :-- | :-- |
| User Authentication | 100% | ✅ Complete | HIGH |
| Group Management | 100% | ✅ Complete | HIGH |
| Basic Expense CRUD | 75% | ⚠️ Bugs | HIGH |
| Expense Splitting | 60% | ⚠️ Issues | HIGH |
| Balance Calculation | 70% | ⚠️ Partial | HIGH |
| Income Tracking | 0% | ❌ Missing | MEDIUM |
| Reports/Export | 0% | ❌ Missing | LOW |
| Settlements | 0% | ❌ Missing | MEDIUM |
| Dashboard Analytics | 30% | ⚠️ Basic | MEDIUM |


***

## 6. Critical Issues

### 🔴 HIGH PRIORITY BUGS

#### Issue \#1: Expense Form Input Focus Loss

**Location:** `frontend/ss/src/pages/Dashboard/Expense.jsx`
**Severity:** Critical
**Impact:** Users cannot type more than 1 character in any input field

**Problem:**

```jsx
// The Modal component is recreated on every render
const Modal = ({ show, onClose, title, children }) => { ... }
```

**Root Cause:**

- Modal component is defined inside the main component function
- Every state change causes the Modal to unmount and remount
- Input fields lose focus when re-rendered

**Solution:**

- Move Modal component outside the main component
- Or use `useCallback` and `useMemo` to prevent recreation
- Extract form component separately

***

#### Issue \#2: Create Expense Button Not Working

**Location:** `frontend/ss/src/pages/Dashboard/Expense.jsx` - `handleCreateExpense()` function
**Severity:** Critical
**Impact:** Users cannot create any expenses

**Problem:**

```javascript
await expenseService.createExpense({
  ...formData,
  groupId: selectedGroup,
  amount: parseFloat(formData.amount),
  // ❌ MISSING: splits field is required by backend
});
```

**Root Cause:**

- Backend `Expense` model requires `splits` array
- Frontend doesn't include `splits` in the request
- Backend validation fails: "Splits cannot be empty"

**Expected Backend Data:**

```javascript
{
  groupId: "507f1f77bcf86cd799439011",
  description: "Groceries",
  amount: 100.00,
  category: "Food",
  date: "2025-11-18",
  payer: "507f1f77bcf86cd799439012", // current user ID
  splits: [
    { user: "507f1f77bcf86cd799439012", amount: 50.00, isPaid: true },
    { user: "507f1f77bcf86cd799439013", amount: 50.00, isPaid: false }
  ]
}
```

**Solution:**

1. Fetch group members when creating expense
2. Calculate equal split: `amount / memberCount`
3. Build splits array with each member
4. Mark payer as `isPaid: true`, others as `isPaid: false`

***

#### Issue \#3: Income Feature Completely Missing

**Severity:** High
**Impact:** 30% of planned functionality missing

**Missing Components:**

1. ❌ `BackEnd/controllers/incomeController.js` - doesn't exist
2. ❌ `BackEnd/routes/incomeRoutes.js` - file exists but is empty
3. ❌ `frontend/ss/src/pages/Dashboard/Income.jsx` - not implemented
4. ❌ `frontend/ss/src/services/incomeService.js` - doesn't exist
5. ❌ Income routes not registered in `server.js`

**Required Implementation:**

- Create income controller with CRUD operations
- Implement income routes
- Build Income.jsx page (similar to Expense.jsx)
- Create income service for API calls
- Register routes in server.js: `app.use('/api/income', incomeRoutes)`

***

### 🟡 MEDIUM PRIORITY ISSUES

#### Issue \#4: Missing Environment Configuration

**Location:** `BackEnd/.env`
**Status:** Unknown (file not visible in repo)

**Required Environment Variables:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/splitsmart
# or
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/splitsmart
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Impact:** Backend may not connect to database

***

#### Issue \#5: CORS Configuration

**Location:** `BackEnd/server.js`
**Current:** Basic CORS enabled

**Potential Issue:**

```javascript
app.use(cors()); // Too permissive for production
```

**Better Configuration:**

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-url.com' 
    : 'http://localhost:5173',
  credentials: true
}));
```


***

#### Issue \#6: Balance Calculation Method Missing

**Location:** `frontend/ss/src/services/expenseService.js`
**Issue:** Method `getGroupBalances()` is called but doesn't exist

**Current Code:**

```javascript
const fetchBalances = async () => {
  try {
    const data = await expenseService.getGroupBalances(selectedGroup);
    // ❌ This method doesn't exist in expenseService.js
    setBalances(data.balances);
  } catch (error) {
    console.error('Failed to load balances', error);
  }
};
```

**Available Method:**

```javascript
getGroupBalance(groupId) // Returns balance for the group
```

**Fix Required:** Update frontend to use correct method name

***

### 🟢 LOW PRIORITY ISSUES

#### Issue \#7: Missing API Base URL Configuration

**Location:** `frontend/ss/src/utils/api.js`
**Recommendation:** Should use environment variable

**Current (assumed):**

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api' // Hardcoded
});
```

**Better:**

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});
```


***

#### Issue \#8: No Error Boundary

**Location:** Frontend root
**Issue:** No global error handling for React errors

**Recommendation:** Add Error Boundary component

***

#### Issue \#9: No Loading States

**Location:** Various pages
**Issue:** Some API calls don't show loading indicators

***

## 7. What's Left to Complete

### 🎯 Immediate Tasks (This Week)

#### Priority 1: Fix Critical Bugs (2-4 hours)

- [ ] **Fix Expense input focus loss** (1 hour)
    - Extract Modal component outside main function
    - Move to separate file or use React.memo
    - Test all form inputs
- [ ] **Fix Create Expense button** (1.5 hours)
    - Fetch group members before creating expense
    - Calculate equal splits automatically
    - Build splits array with proper structure
    - Add payer field to form data
    - Test expense creation flow
- [ ] **Fix Balance API call** (0.5 hour)
    - Change `getGroupBalances()` to `getGroupBalance()`
    - Update error handling
    - Verify balance display


#### Priority 2: Implement Income Feature (6-8 hours)

**Backend Tasks (3-4 hours):**

- [ ] Create `incomeController.js` (1.5 hours)
    - `createIncome()` - POST /api/income
    - `getGroupIncomes()` - GET /api/income/group/:groupId
    - `getIncomeById()` - GET /api/income/:id
    - `updateIncome()` - PUT /api/income/:id
    - `deleteIncome()` - DELETE /api/income/:id
    - `getIncomeStats()` - GET /api/income/group/:groupId/stats
- [ ] Implement `incomeRoutes.js` (1 hour)

```javascript
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const incomeController = require('../controllers/incomeController');

router.post('/', auth, incomeController.createIncome);
router.get('/group/:groupId', auth, incomeController.getGroupIncomes);
router.get('/:id', auth, incomeController.getIncomeById);
router.put('/:id', auth, incomeController.updateIncome);
router.delete('/:id', auth, incomeController.deleteIncome);
router.get('/group/:groupId/stats', auth, incomeController.getIncomeStats);

module.exports = router;
```

- [ ] Register income routes in `server.js` (0.5 hour)

```javascript
app.use('/api/income', require('./routes/incomeRoutes'));
```


**Frontend Tasks (3-4 hours):**

- [ ] Create `incomeService.js` (0.5 hour)
    - Mirror expense service structure
    - All CRUD operations
- [ ] Create `Income.jsx` page (2-3 hours)
    - Copy Expense.jsx structure
    - Modify for income-specific fields:
        - Source (Salary, Freelance, Investment, Gift, Other)
        - Amount
        - Date
        - Description
        - Group selector
    - Income list with edit/delete
    - Total income summary
    - Income vs Expense comparison
- [ ] Add Income navigation/routing (0.5 hour)
    - Add link in navigation menu
    - Configure route in App.jsx


### 📊 Sprint 2 Tasks (Next Week)

#### Enhancement Tasks (8-12 hours)

- [ ] **Implement Settlement System** (4-5 hours)
    - Calculate optimal settlements (minimize transactions)
    - Settlement recommendation UI
    - Mark settlements as complete
    - Settlement history
- [ ] **Add Advanced Expense Features** (2-3 hours)
    - Split type selector (Equal/Custom/Percentage)
    - Custom split input UI
    - Percentage-based splitting
    - Split validation
- [ ] **Improve Dashboard** (2-3 hours)
    - Add expense charts (Chart.js or Recharts)
    - Monthly expense trends
    - Category breakdown pie chart
    - Income vs Expense comparison graph
- [ ] **Add Filtering \& Search** (1-2 hours)
    - Filter expenses by date range
    - Filter by category
    - Search expenses by description
    - Sort options (date, amount, category)


### 🎨 Polish \& Testing (Future)

#### Nice-to-Have Features

- [ ] Receipt upload with Multer (already installed)
- [ ] Export to Excel (ExcelJS already installed)
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Responsive mobile design improvements
- [ ] Loading skeletons
- [ ] Empty state illustrations
- [ ] Toast notification improvements


#### Testing Tasks

- [ ] Unit tests for controllers
- [ ] Integration tests for API endpoints
- [ ] Frontend component tests
- [ ] E2E testing with Cypress or Playwright
- [ ] Test expense split calculations
- [ ] Test balance calculations
- [ ] Test authentication flow


#### DevOps \& Deployment

- [ ] Environment configuration documentation
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Production deployment guide
- [ ] Database backup strategy
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring

***

## 8. Timeline \& Priorities

### Week 1 (Current - Nov 18-24)

**Goal:** Fix critical bugs + Implement Income feature


| Day | Tasks | Owner | Hours |
| :-- | :-- | :-- | :-- |
| Mon-Tue | Fix Expense bugs (focus loss, create button) | You/Prabhkrit | 3-4h |
| Wed | Create Income backend (controller + routes) | Mohammad/Samarjeet | 4h |
| Thu | Create Income frontend (page + service) | Prabhkrit/You | 4h |
| Fri | Testing \& Integration | Team | 2-3h |

**Deliverables:**

- ✅ Working expense creation
- ✅ Functional Income tracking
- ✅ All CRUD operations tested


### Week 2 (Nov 25 - Dec 1)

**Goal:** Enhancement features + Dashboard improvements


| Priority | Feature | Estimated Hours |
| :-- | :-- | :-- |
| HIGH | Settlement system | 4-5h |
| HIGH | Advanced split options | 2-3h |
| MEDIUM | Dashboard charts | 2-3h |
| MEDIUM | Filtering \& search | 1-2h |

**Deliverables:**

- ✅ Settlement recommendations working
- ✅ Custom expense splitting
- ✅ Visual dashboard with charts


### Week 3 (Dec 2-8)

**Goal:** Polish, testing, documentation

- Final bug fixes
- Comprehensive testing
- User documentation
- Deployment preparation
- Final presentation prep

***

## 9. API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
| :-- | :-- | :-- | :-- |
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

**Request/Response Examples:**

**POST /api/auth/register**

```javascript
// Request
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```


***

### Group Endpoints

| Method | Endpoint | Description | Auth Required |
| :-- | :-- | :-- | :-- |
| POST | `/api/groups` | Create group | ✅ |
| GET | `/api/groups` | Get user's groups | ✅ |
| GET | `/api/groups/:id` | Get group by ID | ✅ |
| PUT | `/api/groups/:id` | Update group | ✅ |
| DELETE | `/api/groups/:id` | Delete group | ✅ |
| POST | `/api/groups/:id/members` | Add member | ✅ |
| DELETE | `/api/groups/:id/members/:userId` | Remove member | ✅ |

**Request/Response Examples:**

**POST /api/groups**

```javascript
// Request
{
  "name": "Apartment Roommates",
  "description": "Shared apartment expenses",
  "members": ["userId1", "userId2", "userId3"]
}

// Response
{
  "group": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Apartment Roommates",
    "description": "Shared apartment expenses",
    "admin": "507f1f77bcf86cd799439012",
    "members": [
      { "user": "507f1f77bcf86cd799439012", "joinedAt": "2025-11-18T..." },
      { "user": "507f1f77bcf86cd799439013", "joinedAt": "2025-11-18T..." }
    ],
    "createdAt": "2025-11-18T20:00:00.000Z"
  }
}
```


***

### Expense Endpoints

| Method | Endpoint | Description | Auth Required | Status |
| :-- | :-- | :-- | :-- | :-- |
| POST | `/api/expenses` | Create expense | ✅ | ⚠️ Bug |
| GET | `/api/expenses/group/:groupId` | Get group expenses | ✅ | ✅ |
| GET | `/api/expenses/:id` | Get expense by ID | ✅ | ✅ |
| PUT | `/api/expenses/:id` | Update expense | ✅ | ✅ |
| DELETE | `/api/expenses/:id` | Delete expense | ✅ | ✅ |
| GET | `/api/expenses/group/:groupId/balance` | Get balances | ✅ | ✅ |
| POST | `/api/expenses/:id/mark-paid` | Mark split paid | ✅ | ✅ |

**Request/Response Examples:**

**POST /api/expenses**

```javascript
// Request
{
  "groupId": "507f1f77bcf86cd799439011",
  "description": "Grocery shopping",
  "amount": 150.00,
  "category": "Food",
  "date": "2025-11-18",
  "payer": "507f1f77bcf86cd799439012",
  "splits": [
    { "user": "507f1f77bcf86cd799439012", "amount": 50.00, "isPaid": true },
    { "user": "507f1f77bcf86cd799439013", "amount": 50.00, "isPaid": false },
    { "user": "507f1f77bcf86cd799439014", "amount": 50.00, "isPaid": false }
  ]
}

// Response
{
  "expense": {
    "_id": "507f1f77bcf86cd799439015",
    "group": "507f1f77bcf86cd799439011",
    "description": "Grocery shopping",
    "amount": 150.00,
    "category": "Food",
    "date": "2025-11-18T00:00:00.000Z",
    "payer": "507f1f77bcf86cd799439012",
    "splits": [...],
    "createdAt": "2025-11-18T20:00:00.000Z"
  }
}
```

**GET /api/expenses/group/:groupId/balance**

```javascript
// Response
{
  "balances": [
    {
      "userId": "507f1f77bcf86cd799439012",
      "userName": "John Doe",
      "balance": 50.00  // Positive = owed to user, Negative = user owes
    },
    {
      "userId": "507f1f77bcf86cd799439013",
      "userName": "Jane Smith",
      "balance": -25.00
    },
    {
      "userId": "507f1f77bcf86cd799439014",
      "userName": "Bob Johnson",
      "balance": -25.00
    }
  ]
}
```


***

### Income Endpoints (TO BE IMPLEMENTED)

| Method | Endpoint | Description | Auth Required | Status |
| :-- | :-- | :-- | :-- | :-- |
| POST | `/api/income` | Create income | ✅ | ❌ |
| GET | `/api/income/group/:groupId` | Get group incomes | ✅ | ❌ |
| GET | `/api/income/:id` | Get income by ID | ✅ | ❌ |
| PUT | `/api/income/:id` | Update income | ✅ | ❌ |
| DELETE | `/api/income/:id` | Delete income | ✅ | ❌ |
| GET | `/api/income/group/:groupId/stats` | Get income stats | ✅ | ❌ |

**Planned Request/Response:**

**POST /api/income**

```javascript
// Request
{
  "groupId": "507f1f77bcf86cd799439011",
  "source": "Salary",
  "amount": 5000.00,
  "date": "2025-11-01",
  "description": "Monthly salary",
  "user": "507f1f77bcf86cd799439012"
}

// Response
{
  "income": {
    "_id": "507f1f77bcf86cd799439016",
    "group": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "source": "Salary",
    "amount": 5000.00,
    "date": "2025-11-01T00:00:00.000Z",
    "description": "Monthly salary",
    "createdAt": "2025-11-18T20:00:00.000Z"
  }
}
```


***

## 10. Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  fullName: String,          // Required
  email: String,             // Required, Unique
  password: String,          // Required, Hashed with bcrypt
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}

// Indexes
email: unique
```


***

### Group Collection

```javascript
{
  _id: ObjectId,
  name: String,              // Required
  description: String,
  admin: ObjectId,           // Required, ref: 'User'
  members: [
    {
      user: ObjectId,        // Required, ref: 'User'
      joinedAt: Date         // Default: Date.now
    }
  ],
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}

// Methods
- isMember(userId): Boolean  // Check if user is member
```


***

### Expense Collection

```javascript
{
  _id: ObjectId,
  group: ObjectId,           // Required, ref: 'Group'
  description: String,       // Required
  amount: Number,            // Required, min: 0
  payer: ObjectId,          // Required, ref: 'User'
  category: String,          // Enum: ['Food', 'Travel', 'Utilities', 'Other']
                            // Default: 'Other'
  date: Date,               // Default: Date.now
  splits: [
    {
      user: ObjectId,        // Required, ref: 'User'
      amount: Number,        // Required, min: 0
      isPaid: Boolean        // Default: false
    }
  ],
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}

// Validation
- splits.length > 0```

