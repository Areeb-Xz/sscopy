# Product Backlog (PB.md)

1. As an **undergraduate student**, I want to **log a rent payment** and specify roommates’ room sizes and days occupied, so that I can **automatically calculate each person’s fair share**.  
   Criteria of Satisfaction:  
   - User can enter total rent amount, select roommates, input room size ratios and occupancy days.  
   - System computes per-roommate amount and displays breakdown.

2. As an **undergraduate student**, I want to **photograph and upload grocery receipts**, tag participants, and categorize items, so that I can **split the bill based on individual consumption**.  
   Criteria of Satisfaction:  
   - User can take or select a receipt image.  
   - User can tag participants and assign items.  
   - System allocates costs accurately and shows itemized splits.

3. As an **undergraduate student**, I want to **review my weekly expense summary**, so that I can **monitor balances and ensure no debts are forgotten**.  
   Criteria of Satisfaction:  
   - System generates a summary view filtered by date range.  
   - Summary shows each expense, participants, amounts owed, and running balance.

4. As an **undergraduate student**, I want to **export monthly balances as CSV or PDF**, so that I can **keep records for personal budgeting or dispute resolution**.  
   Criteria of Satisfaction:  
   - User can select export format and date range.  
   - System generates and downloads file with expense details and calculations.

5. As an **undergraduate student**, I want to **receive clear notifications** when balances change, so that I can **stay informed of new expenses or payments**.  
   Criteria of Satisfaction:  
   - User receives notifications listing expense title, amount, date, and changed balance.  
   - Notifications can be marked read or dismissed.

6. As an **undergraduate student**, I want to **enter expenses offline** and sync later, so that I can **capture data in unreliable network conditions**.  
   Criteria of Satisfaction:  
   - App allows expense entry without connectivity.  
   - Upon reconnection, local entries sync without duplication.

7. As an **international graduate student**, I want to **log expenses in original currency** with timestamped exchange rates, so that I can **ensure accurate multi-currency conversions**.  
   Criteria of Satisfaction:  
   - User can select expense currency and date.  
   - System fetches and records exchange rate, shows converted amount.

8. As an **international graduate student**, I want to **add notes to each expense** for visa or scholarship documentation, so that I can **include context in exported reports**.  
   Criteria of Satisfaction:  
   - User can enter free-text notes per expense.  
   - Notes appear in exported CSV/PDF adjacent to expense line.

9. As an **international graduate student**, I want to **set up recurring expenses** for shared subscriptions, so that I can **automatically split future charges**.  
   Criteria of Satisfaction:  
   - User defines subscription name, amount, frequency, and participants.  
   - System generates future expense entries automatically.

10. As an **international graduate student**, I want to **receive time-zone–aware reminders** for outstanding balances, so that I can **promptly request reimbursements**.  
    Criteria of Satisfaction:  
    - User specifies preferred notification times and time zone.  
    - System sends reminders at correct local times.

11. As a **student club treasurer**, I want to **assign approvals to officers**, so that I can **enforce proper workflow before reimbursements**.  
    Criteria of Satisfaction:  
    - User can tag expenses as “Pending Approval.”  
    - Designated approvers can view, approve, or reject with comments.

12. As a **student club treasurer**, I want to **batch-log multiple event expenses**, so that I can **enter purchases efficiently during busy events**.  
    Criteria of Satisfaction:  
    - User can select multiple receipts/images at once.  
    - System creates separate expense entries for each.

13. As a **student club treasurer**, I want to **export compliance-ready expense reports**, so that I can **submit accurate documentation to funding bodies**.  
    Criteria of Satisfaction:  
    - User can select report type (PDF/CSV) and filters (date, category).  
    - Export includes receipt images, payer, approver, and timestamps.

14. As a **student club treasurer**, I want to **restrict access by role**, so that I can **control who can view or edit sensitive financial data**.  
    Criteria of Satisfaction:  
    - User can assign roles (Treasurer, Officer, Member) with permissions.  
    - System enforces read/write restrictions accordingly.

15. As an **undergraduate student**, I want to **view the calculation steps** for any expense split, so that I can **verify fairness and transparency**.  
    Criteria of Satisfaction:  
    - User clicks “View Details” to see formula, ratios, and intermediate values.  
    - No hidden calculations; all steps visible.

16. As an **undergraduate student**, I want to **adjust a split ratio manually**, so that I can **address special cases like guests or dietary restrictions**.  
    Criteria of Satisfaction:  
    - User can override system-calculated shares per participant.  
    - Adjusted shares recalculate total and update balances.

17. As an **undergraduate student**, I want to **create and manage shared emergency funds**, so that a group can **contribute and draw on a collective reserve**.  
    Criteria of Satisfaction:  
    - User can create a fund, invite participants, and set contribution amounts.  
    - System tracks deposits, withdrawals, and available balance.

18. As an **undergraduate student**, I want to **minimize settlement transactions**, so that I can **reduce the number of money transfers needed**.  
    Criteria of Satisfaction:  
    - System runs debt-consolidation algorithm to suggest optimized payment paths.  
    - Suggestions list who pays whom and how much.

19. As an **undergraduate student**, I want to **rate roommates’ payment reliability**, so that I can **build trust scores for future shared expenses**.  
    Criteria of Satisfaction:  
    - After settlement, user can give positive/negative feedback.  
    - System aggregates scores per user and displays reliability metric.

20. As an **undergraduate student**, I want to **archive completed groups or expense projects**, so that I can **keep my workspace uncluttered while retaining historical records**.  
    Criteria of Satisfaction:  
    - User can move a group to “Archived.”  
    - Archived groups disappear from active lists but remain searchable.

***
