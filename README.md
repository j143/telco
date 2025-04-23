# LeetCode for 5G and Network Engineers

## Overview
This project aims to create a specialized platform for 5G and network engineers to practice and improve their problem-solving skills. The platform will feature coding challenges and problems tailored to the domain of telecommunications, 5G networks, and related technologies.

## Objectives
- Provide domain-specific coding challenges for 5G and network engineers.
- Help engineers improve their problem-solving skills in telecommunications and networking.
- Create a community-driven platform where users can contribute problems and solutions.

## Features
1. **Problem Categories**:
   - 5G Protocols
   - Network Optimization
   - Signal Processing
   - Network Security
   - IoT and 5G Integration

2. **Problem Difficulty Levels**:
   - Beginner
   - Intermediate

3. **User Features**:
   - User Profiles
   - Problem Solving History
   - Leaderboards

4. **Problem Creation**:
   - Allow users to submit problems.
   - Review and approve submitted problems.

5. **Solution Evaluation**:
   - Automated code evaluation.
   - Test cases for each problem.
   - judging tool implementation?: we can implement a basic callflow judge with javascript to test the understanding


## Technical Requirements
- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Code Execution**: Docker-based isolated environments for running user-submitted code. or simple javascript.
- **Hosting**: Cloud-based (AWS, Azure, or GCP). or will keep it minimal as a start.

## Questions to Build a Concrete Plan
1. What specific topics in 5G and networking should be covered?
   - test call flows understanding. features.
2. Should the platform support multiple programming languages? If yes, which ones?
   - we can use visual programming etc also.
3. What kind of user authentication and authorization is required?
   - firebase based, we can use
4. Should there be a reward system for solving problems (e.g., badges, points)?
   - basic points
5. How should the community features (forums, voting, etc.) be implemented?
   - for now, keep it simple, just problems
6. What is the expected scale of the platform (number of users, problems, etc.)?
   - for now, just 5 people
7. Should the platform integrate with existing tools or platforms (e.g., GitHub, LinkedIn)?
   - next phases

Feel free to provide additional requirements or clarify the objectives.