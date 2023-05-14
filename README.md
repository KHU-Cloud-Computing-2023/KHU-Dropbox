# KHUBOX
경희대학교 2023년 1학기 클라우드 컴퓨팅 H조

## Backend 서버 구동 전

1. application.property 파일의 아래 항목에 대한 수정이 필요

```
spring.datasource.url=jdbc:mysql://localhost:3306/khubox
spring.datasource.username={root}
spring.datasource.password={password}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
spring.datasource.username 항목과 spring.datasource.password 항목에 MySQL 계정 정보

2. MySQL 실행
