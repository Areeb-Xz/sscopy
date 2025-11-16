## Sprint 2 Weekly Sync Meeting — Thursday, November 13, 2025

**Date:** Thursday, November 12, 2025  
**Time:** 2:00 PM – 3:30 PM EST  
**Location:** in person  
**Attendees:**  
- Mohammad Areeb ✅  
- Prabhkrit Singh ✅  
- Samarjeet Singh ✅  

### Agenda:
- Review of progress on [2.1] Create Group and [2.2] View Groups List
- Status update on Add Members to Group feature
- Discussion of Equal Expense Splitting implementation challenges
- Database performance and optimization review
- Blockers and risks identification

---

### Meeting Notes:

#### 1. Progress on Carried-Over Stories
- **[2.1] Create Group:** Backend endpoints ~95% complete, frontend modal fully integrated. Testing in progress.
- **[2.2] View Groups List:** Backend query optimized, frontend UI connected and working end-to-end. Story ready for testing phase.
- **Consensus:** Both stories on track for completion by Nov 14.

#### 2. Add Members to Group Feature Status
- Backend Add Members endpoint ~80% complete; validation and error handling need final review
- Frontend invitation modal UI ~70% done; email search functionality implemented
- Integration tests scheduled for Nov 14
- **Blocker:** API response format finalization needed for proper frontend error handling

#### 3. Equal Expense Splitting Implementation
- Backend splitting algorithm draft complete; edge cases (decimal rounding, member removal) identified
- Frontend balance display component started; UI layout approved
- **Spike identified:** Precision handling for currency values—recommend using fixed decimal library
- **Decision:** Test with sample data first before full integration; adjust algorithm if needed

#### 4. Database Performance & Optimization
- Indexes for group queries implemented and tested
- Query performance acceptable for current dataset; will monitor as scale grows
- Backup automation script created; ready for deployment
- **Action:** Samarjeet to set up automated backups by Nov 15

#### 5. Blockers & Risks
- **Blocker:** API response format inconsistency between team members' expectations (resolved via discussion)
- **Risk:** Equal splitting precision may require additional library import; time to vet/integrate ~2 hours
- **Mitigation:** Allocate time on Nov 14 for testing precision handling before final sprint days

#### 6. Actions & Next Meeting
- Mohammad: Finalize Add Members API; resolve response format inconsistencies
- Prabhkrit: Complete Add Members UI; begin View Group Members component
- Samarjeet: Deploy backup automation; monitor balance calculation performance
- **Next in-person sync:** Sunday, November 16, 2025, 4:00 PM EST (if needed)

---

**Note:**  
This sprint plan and team commitments **are flexible and subject to change** based on emerging technical challenges, testing results, or shifting priorities. All adjustments and decisions will be documented in subsequent meeting notes and standups.

---

**Summary/Decisions:**  
- All team members present and actively contributed.
- Carried-over stories are on schedule for completion this sprint.
- Equal splitting implementation requires precision handling—team will vet solutions by Nov 16.
- Remove Member feature deferred to Sprint 3 to ensure quality on core features.
- Meeting minutes saved to `docs/sprint2`.
- Reference made in sprint2.md and retrospective documents for TA grading/compliance.