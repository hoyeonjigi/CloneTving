package site.hoyeonjigi.clonetving.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import site.hoyeonjigi.clonetving.domain.GenreEntity;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;

@SpringBootTest
@Transactional
public class ProfileImageRepositoryTest {

    @Autowired
    ProfileImageRepository profileImageRepository;

    void save(String imageId, String imageName, String imageUrl){
        ProfileImageEntity profileImageEntity = ProfileImageEntity.builder()
                                                    .imageId(imageId)
                                                    .imageName(imageName)
                                                    .imageUrl(imageUrl).build();
        ProfileImageEntity saveProfileImageEntity = profileImageRepository.save(profileImageEntity);
        assertEquals(profileImageEntity, saveProfileImageEntity);
    }


    @Test
    void saveProfileImage() throws IOException{
        save("1001", "기본1", "/test/imageurl");
    }


    @Test
    void testFindByImageName() {
        ProfileImageEntity profileImageEntity = profileImageRepository.findByImageName("기본1");
        assertEquals("1001", profileImageEntity.getImageId());
    }

    @Test
    void profileListTest(){
        List<ProfileImageEntity> profileImages = profileImageRepository.findAll();
        Assertions.assertThat(profileImages.get(0).getImageName()).isEqualTo("default_01");
    }


}
