# Product Backlog (PB.md) — Updated for Sprint 2

**Last Updated:** November 17, 2025  
**Project:** SplitSmart - Expense Sharing Application  
**Team:** Group K (Mohammad Areeb, Prabhkrit Singh, Samarjeet Singh)

---

## Sprint Status Summary

| Sprint | Status | Story Points | Stories Completed |
|--------|--------|--------------|-------------------|
| Sprint 1 | ✅ Complete | 13 SP | [1.1], [1.2], [1.5] |
| Sprint 2 | ✅ Complete | 24 SP | [2.1], [2.2], [2.3] |
| Sprint 3 | 📋 Planned | 18-20 SP | TBD |

**Total Completed:** 37 SP out of ~120 SP total backlog

---

## Completed Stories (Sprints 1 & 2)

### Sprint 1 — Authentication & Expense Tracker ✅
- **[1.1] User Registration** — 5 SP ✅
- **[1.2] User Login** — 3 SP ✅
- **[1.5] Expense Tracker CRUD** — 5 SP ✅

### Sprint 2 — Group Management & Basic Splitting ✅
- **[2.1] Create Group** — 5 SP ✅
- **[2.2] View Groups List** — 3 SP ✅
- **[2.3] Add Members to Group** — 5 SP ✅
- **[2.4] View Group Members** — 3 SP ✅
- **[2.5] Equal Expense Splitting** — 8 SP ✅

---

## Sprint 3 — High Priority (Planned)

### [2.6] Remove Member from Group — 3 SP 🔴 HIGH
**As a** group admin  
**I want to** remove a member from the group  
**So that** they no longer have access to group expenses

**Criteria of Satisfaction:**
- Admin can remove any member (except themselves)
- Confirmation prompt before removal
- Removed member loses access immediately
- Past expense history preserved (shows "Former Member")

**Status:** Deferred from Sprint 2  
**Priority:** Highest for Sprint 3

---

### [3.1] Unequal Expense Splitting — 8 SP 🔴 HIGH
**As a** group member  
**I want to** split expenses by custom percentages or amounts  
**So that** I can handle situations where not everyone owes the same

**Criteria of Satisfaction:**
- User can choose "Custom Split" option
- User enters specific amount or percentage per member
- System validates total equals 100% or full amount
- Running balances update correctly
- Error handling for invalid splits

**Technical Notes:**
- Extends [2.5] Equal Splitting algorithm
- UI: Toggle between Equal/Custom split modes

---

### [3.2] Settlement Suggestions — 8 SP 🔴 HIGH
**As a** group member  
**I want to** see optimized settlement suggestions  
**So that** I can minimize the number of transactions needed

**Criteria of Satisfaction:**
- System calculates who owes whom
- Algorithm minimizes number of transactions
- Shows clear payment instructions (e.g., "Alice pays Bob $25")
- User can mark settlements as complete
- Balances update after settlement marked complete

**Technical Notes:**
- Debt consolidation algorithm (greedy approach)
- Research: Splitwise settlement algorithm

---

## Sprint 3+ — Medium Priority

### 3. Review Weekly Expense Summary — 5 SP 🟡 MEDIUM
**As an** undergraduate student  
**I want to** review my weekly expense summary  
**So that** I can monitor balances and ensure no debts are forgotten

**Criteria of Satisfaction:**
- System generates summary view filtered by date range
- Summary shows each expense, participants, amounts owed, running balance
- Filter by date range, group, or category

---

### 4. Export Monthly Balances (CSV/PDF) — 5 SP 🟡 MEDIUM
**As an** undergraduate student  
**I want to** export monthly balances as CSV or PDF  
**So that** I can keep records for personal budgeting

**Criteria of Satisfaction:**
- User can select export format and date range
- System generates and downloads file with expense details and calculations
- Export includes: date, description, amount, participants, balances

---

### 5. Notifications for Balance Changes — 5 SP 🟡 MEDIUM
**As an** undergraduate student  
**I want to** receive clear notifications when balances change  
**So that** I can stay informed of new expenses or payments

**Criteria of Satisfaction:**
- User receives notifications for new expenses, payments, settlements
- Notifications show expense title, amount, date, changed balance
- Notifications can be marked read or dismissed
- Email notifications (optional)

---

### 8. Add Notes to Expenses — 3 SP 🟡 MEDIUM
**As an** international graduate student  
**I want to** add notes to each expense  
**So that** I can include context for visa or scholarship documentation

**Criteria of Satisfaction:**
- User can enter free-text notes per expense
- Notes appear in expense detail view
- Notes included in exported CSV/PDF

---

### 15. View Calculation Steps — 3 SP 🟡 MEDIUM
**As an** undergraduate student  
**I want to** view the calculation steps for any expense split  
**So that** I can verify fairness and transparency

**Criteria of Satisfaction:**
- User clicks "View Details" to see formula, ratios, intermediate values
- No hidden calculations; all steps visible
- Shows: total amount, # members, per-person share, remainder handling

---

### 16. Adjust Split Ratios Manually — 5 SP 🟡 MEDIUM
**As an** undergraduate student  
**I want to** adjust a split ratio manually  
**So that** I can address special cases like guests or dietary restrictions

**Criteria of Satisfaction:**
- User can override system-calculated shares per participant
- Adjusted shares recalculate total and update balances
- Warning if total doesn't match expense amount

---

## Future Backlog — Low Priority

### 1. Log Rent Payment with Room Sizes — 8 SP 🟢 LOW
**As an** undergraduate student  
**I want to** log rent payment with room sizes and occupancy days  
**So that** I can calculate fair share based on room size

**Criteria of Satisfaction:**
- User enters total rent, selects roommates, inputs room size ratios and occupancy days
- System computes per-roommate amount and displays breakdown

---

### 2. Receipt Upload & OCR — 13 SP 🟢 LOW
**As an** undergraduate student  
**I want to** photograph and upload grocery receipts  
**So that** I can split the bill based on individual consumption

**Criteria of Satisfaction:**
- User can take or select receipt image
- User can tag participants and assign items
- System allocates costs accurately and shows itemized splits
- OCR extracts line items (optional)

---

### 6. Offline Expense Entry — 8 SP 🟢 LOW
**As an** undergraduate student  
**I want to** enter expenses offline and sync later  
**So that** I can capture data in unreliable network conditions

**Criteria of Satisfaction:**
- App allows expense entry without connectivity
- Upon reconnection, local entries sync without duplication
- Conflict resolution if same expense edited online

---

### 7. Multi-Currency Support — 8 SP 🟢 LOW
**As an** international graduate student  
**I want to** log expenses in original currency with timestamped exchange rates  
**So that** I can ensure accurate conversions

**Criteria of Satisfaction:**
- User can select expense currency and date
- System fetches and records exchange rate
- Shows converted amount in user's default currency

---

### 9. Recurring Expenses — 5 SP 🟢 LOW
**As an** international graduate student  
**I want to** set up recurring expenses for shared subscriptions  
**So that** I can automatically split future charges

**Criteria of Satisfaction:**
- User defines subscription name, amount, frequency, participants
- System generates future expense entries automatically
- User can cancel or modify recurring expense

---

### 10. Time-Zone Aware Reminders — 5 SP 🟢 LOW
**As an** international graduate student  
**I want to** receive time-zone aware reminders  
**So that** I can promptly request reimbursements

**Criteria of Satisfaction:**
- User specifies preferred notification times and time zone
- System sends reminders at correct local times

---

### 11. Approval Workflow — 8 SP 🟢 LOW
**As a** student club treasurer  
**I want to** assign approvals to officers  
**So that** I can enforce proper workflow before reimbursements

**Criteria of Satisfaction:**
- User can tag expenses as "Pending Approval"
- Designated approvers can view, approve, or reject with comments
- Approved expenses proceed to settlement

---

### 12. Batch-Log Multiple Expenses — 5 SP 🟢 LOW
**As a** student club treasurer  
**I want to** batch-log multiple event expenses  
**So that** I can enter purchases efficiently during busy events

**Criteria of Satisfaction:**
- User can select multiple receipts/images at once
- System creates separate expense entries for each

---

### 13. Compliance-Ready Export — 8 SP 🟢 LOW
**As a** student club treasurer  
**I want to** export compliance-ready expense reports  
**So that** I can submit documentation to funding bodies

**Criteria of Satisfaction:**
- User can select report type (PDF/CSV) and filters (date, category)
- Export includes receipt images, payer, approver, timestamps

---

### 14. Role-Based Access Control — 8 SP 🟢 LOW
**As a** student club treasurer  
**I want to** restrict access by role  
**So that** I can control who can view or edit sensitive financial data

**Criteria of Satisfaction:**
- User can assign roles (Treasurer, Officer, Member) with permissions
- System enforces read/write restrictions accordingly

---

### 17. Shared Emergency Fund — 8 SP 🟢 LOW
**As an** undergraduate student  
**I want to** create and manage shared emergency funds  
**So that** a group can contribute and draw on a collective reserve

**Criteria of Satisfaction:**
- User can create fund, invite participants, set contribution amounts
- System tracks deposits, withdrawals, available balance

---

### 19. Payment Reliability Rating — 5 SP 🟢 LOW
**As an** undergraduate student  
**I want to** rate roommates' payment reliability  
**So that** I can build trust scores for future shared expenses

**Criteria of Satisfaction:**
- After settlement, user can give positive/negative feedback
- System aggregates scores per user and displays reliability metric

---

### 20. Archive Completed Groups — 3 SP 🟢 LOW
**As an** undergraduate student  
**I want to** archive completed groups or expense projects  
**So that** I can keep my workspace uncluttered

**Criteria of Satisfaction:**
- User can move group to "Archived"
- Archived groups disappear from active lists but remain searchable

---

## Backlog Prioritization Rationale

### High Priority (Sprint 3):
- **[2.6] Remove Member:** Essential for complete group management
- **[3.1] Unequal Splitting:** Critical for real-world use cases
- **[3.2] Settlement Suggestions:** Core value proposition of app

### Medium Priority (Sprint 4-5):
- User experience enhancements (summary, export, notifications)
- Transparency features (calculation steps, manual adjustments)

### Low Priority (Future):
- Advanced features (OCR, multi-currency, offline mode)
- Enterprise features (approvals, compliance, RBAC)
- Nice-to-haves (ratings, recurring expenses, emergency funds)

---

## Velocity Tracking

| Sprint | Planned SP | Completed SP | Velocity |
|--------|-----------|--------------|----------|
| Sprint 1 | 13 SP | 13 SP | 6.5 SP/week |
| Sprint 2 | 16-18 SP | 24 SP | 12 SP/week |
| **Average** | — | — | **9.25 SP/week** |

**Sprint 3 Target:** 18-20 SP (based on average velocity)

---

**Prepared by:** Group K  
**Course:** EECS3311 - Software Engineering  
**Institution:** York University  
**Last Updated:** November 17, 2025