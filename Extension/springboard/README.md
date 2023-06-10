<h1>Spring Board</h1>

스프링 부트를 이용한 게시판 만들기 예제 코드입니다.


아래와 같은 에러가 발생하시는 분들은 

/Users/odongjin/elasticboard/src/main/java/com/tutorial/springboardelastic/example/controller/BoardController.java
Error:(31, 42) java: cannot find symbol
symbol: method getContent()
location: variable e of type com.tutorial.springboardelastic.example.domain.Board
/Users/odongjin/elasticboard/src/main/java/com/tutorial/springboardelastic/example/AppRunner.java
Error:(27, 45) java: cannot find symbol
symbol: method builder()
location: class com.tutorial.springboardelastic.example.domain.User
Error:(35, 43) java: cannot find symbol
symbol: method builder()
location: class com.tutorial.springboardelastic.example.domain.Board


intellij 기준 File -> Settings -> Annotation Processors 에 가셔서
Enable annotation processing 을 체크하시면 됩니다!

