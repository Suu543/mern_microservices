### Initial App Setup

- Generate a new React App using Create-React-App
- Create an Express-based project for the Posts Service
- Create an Express-based project for the Comments Service

# Problem

GET /posts 를 생각했을 때. 10 개의 Posts가 있다고 생각해보자. 그러면 총 열번의 GET 요청을 보내야한다.
이 방식은 비효율적이다. 어떻게 이 방식을 개선할 수 있을까? 어떻게 하면 한 번의 요청으로 모든 comments를 가져올 수 있을까?

# solution - Easily solved with monoliths!

        ------- GET /posts?comments=true ------> Posts Service (Posts Feature)

Client

        <------ Posts with embedded comments --- Comments Service (Comments Feature)

# solution1 - Sync Communication

Client ------- GET /posts?comments=true ---------> Posts Service --------> Hey, give me all comments for posts with ID's 37, 6, 82 -----> Comments Service

# Note on Sync Communication - 장점은 개념적으로 쉽게 이해할 수 있고 빠르지만, 단점은 한 부분의 붕괴가 시스템 전체의 붕괴로 이어진다)

- Conceptually easy to understand
- Introduces a dependency between services
- If any inter-service request fails, the overall request fails (만약 Comments Service 자체가 사라진다면 서비스 전체가 동작하지 않는다.)
- The entire request is only as fast as the slowest request
- Can easily introduce webs of request

# solution2 - Async Solution

