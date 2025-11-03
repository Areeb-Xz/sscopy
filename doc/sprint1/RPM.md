# RPM.md - Release Planning Meeting

## Meeting Details
**Date:** October 21, 2025  
**Duration:** 2 hours  
**Location:** Virtual (Zoom)

## Participants
- Mohammad Areeb – Product Owner & Backend Developer
- Prabhkrit Singh – Scrum Master & Frontend Developer
- Samarjeet Singh – Database & DevOps Engineer

## Release Goal
Deliver a functional expense-sharing platform for students by the end of the semester (December 2025) that enables users to log expenses, split costs accurately using multiple methods, track balances across groups, and settle debts efficiently. The MVP will focus on core expense management features with transparent calculations and user-friendly mobile-first interface.

## Project Scope
### Epics / Key Features
- **User Management & Authentication**: Registration, login, profile, university email verification, password reset
- **Group Management**: Create and manage groups, invite members, assign roles, archive groups
- **Expense Logging & Splitting**: Log expenses, split equally/by ratios, days, notes, categories
- **Balance Tracking & Calculations**: View balances, who owes whom, calculation breakdowns, history/audit trail
- **Settlements**: Mark expenses settled, debt consolidation, settlement reminders
- **Receipt Management (Future)**: Upload receipts, OCR, item tagging
- **Multi-Currency Support (Future)**: Multiple currencies, real-time conversion, historical tracking
- **Notifications & Reporting (Future)**: Notifications, exports

## Release Timeline
- **Sprint 1 (Nov 3–Nov 17)**: Core infrastructure, user authentication, basic group management
- **Sprint 2 (Nov 18–Dec 1)**: Expense logging, splitting, balance calculations
- **Sprint 3 (Dec 2–Dec 15)**: Advanced splitting, settlements, polish & bug fixes

## Success Metrics
- All team members can create accounts and groups
- Users can log expenses and see accurate balance calculations
- At least three splitting methods implemented
- Settlement flow functional
- 80%+ test coverage backend logic
- Clean, intuitive UI/UX

## Technical Decisions
- **Stack:** MERN
- **Architecture:** MVC
- **Design Patterns:** Observer, Strategy, Command
- **Version Control:** Git feature branching
- **Deployment:** Local Dev, Staging Cloud

## Risks & Mitigation
- Complex calculations: Start simple, incremental testing
- Team member availability: Front-load core features, flexible assignment
- Integration issues: Early API contract, mock data, parallel development

## Questions & Decisions
- Offline functionality: Not for MVP, defer.
- Auth method: JWT (university SSO later).
- Currency: CAD for Sprint 1–2, multi-currency in Sprint 3 if possible.