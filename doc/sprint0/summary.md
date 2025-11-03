## Project Overview

SplitSmart addresses the persistent challenge faced by students, roommates, and social groups: accurately splitting shared expenses while maintaining transparency and accountability. Traditional methods like manual calculations, spreadsheets, or cash tracking often lead to disputes, forgotten debts, and damaged relationships. SplitSmart provides a comprehensive solution that not only tracks expenses but also incorporates advanced features tailored specifically for the student demographic.

## Project Objectives

**Primary Objectives:**
- Develop a robust expense tracking system that implements **Design by Contract (DbC)** principles with clear preconditions, postconditions, and class invariants
- Apply multiple **design patterns** including Observer, Strategy, and Command patterns to create maintainable and extensible architecture
- Enable seamless expense logging, calculation, and balance tracking with mathematical precision and verification
- Implement comprehensive testing frameworks with automated unit tests and acceptance testing

**Secondary Objectives:**
- Integrate cutting-edge features that differentiate SplitSmart from existing solutions like Splitwise, Tricount, and Settle Up
- Create a foundation for advanced AI-powered receipt processing and expense categorization
- Establish secure user authentication and data privacy protection suitable for financial applications

## Key Users

**Primary Users:**
- **University Students** living in shared accommodations with complex financial arrangements including rent, utilities, groceries, and academic expenses
- **Roommates** managing ongoing household expenses with varying payment schedules and contribution levels
- **Student Groups** organizing events, trips, study sessions, or social activities requiring expense coordination

**Secondary Users:**
- International students dealing with currency conversion and different payment methods
- Student clubs and organizations managing group purchases and event costs
- Graduate students and young professionals transitioning from student life

## Key Scenarios & Use Cases

**Core Scenarios:**
- **Dynamic Rent Management**: A student pays the full rent upfront and needs to track varying monthly contributions from roommates who may have different room sizes, lease periods, or temporary absences
- **Smart Grocery Splitting**: After group shopping, users can photograph receipts and have expenses automatically categorized and split based on individual consumption patterns or dietary restrictions
- **Event Cost Management**: Planning group trips or parties where expenses accumulate over time with different participants contributing to different activities
- **Utility Bill Optimization**: Tracking seasonal variations in utility costs and adjusting splits based on actual usage patterns

**Advanced Scenarios:**
- **Predictive Budgeting**: Using historical data to forecast upcoming shared expenses and suggest optimal contribution schedules
- **Multi-Currency Management**: International students can log expenses in different currencies with real-time conversion and settlement
- **Subscription Tracking**: Managing shared digital subscriptions (Netflix, Spotify, etc.) with automated recurring expense handling

## Design Principles

**Software Design Principles:**
- **Design by Contract (DbC)**: All classes implement precise preconditions, postconditions, and invariants ensuring system reliability
- **Modular Design**: Clear separation of concerns with well-defined interfaces between expense tracking, user management, and calculation modules
- **Inheritance and Polymorphism**: Flexible expense types (rent, groceries, utilities) using object-oriented inheritance hierarchies
- **Exception Handling**: Robust error management for financial calculations and data validation

**User Experience Principles:**
- **Transparency**: Real-time visibility into all calculations, balances, and transaction history
- **Simplicity**: Intuitive interface requiring minimal learning curve for busy students
- **Accuracy**: Mathematical precision in all calculations with detailed audit trails
- **Accessibility**: Support for multiple devices and offline functionality