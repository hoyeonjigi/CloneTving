package site.hoyeonjigi.clonetving.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class ProfileImageRepositoryTest {

    @Autowired
    ProfileImageRepository profileImageRepository;

    @Test
    void saveProfileImage(){
        
    }
}
