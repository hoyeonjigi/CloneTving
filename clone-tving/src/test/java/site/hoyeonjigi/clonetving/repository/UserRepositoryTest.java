package site.hoyeonjigi.clonetving.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import jakarta.transaction.Transactional;
import site.hoyeonjigi.clonetving.domain.UserEntity;

@SpringBootTest
@Transactional
public class UserRepositoryTest {
    
    @Autowired
    UserRepository userRepository;

    @Test
    void save(){
        //given
        UserEntity userEntity = UserEntity.builder()
                                    .userId("abc123")
                                    .userPassword("1234")
                                    .userEmail("abc123@naver.com")
                                    .adultStatus(true)
                                    .privacyAgreement(true)
                                    .emailAgreement(true)
                                    .smsAgreement(true).build();

        //when
        UserEntity saveUserEntity = userRepository.save(userEntity);

        //then
        assertEquals(userEntity, saveUserEntity);
    }

}
