package site.hoyeonjigi.clonetving.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
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

    void save(String imageId, String imageName, byte[] imageBolb){
        ProfileImageEntity profileImageEntity = ProfileImageEntity.builder()
                                                    .imageId(imageId)
                                                    .imageName(imageName)
                                                    .imageBlob(imageBolb).build();
        ProfileImageEntity saveProfileImageEntity = profileImageRepository.save(profileImageEntity);
        assertEquals(profileImageEntity, saveProfileImageEntity);
    }


    @Test
    void saveProfileImage() throws IOException{
        byte[] imagetobyte = imageTobyteArray("/Users/choiminsik/Downloads/default1.png");
        save("1001", "기본1", imagetobyte);
    }

    @Test
    void loadImage(){
        ProfileImageEntity findImageEntity = profileImageRepository.findProfileImage("1001").get(0);
        byte[] loadimage = findImageEntity.getImageBlob();
        byteArrayToImage(loadimage);
    }

    public static byte[] imageTobyteArray(String imagePath) throws IOException{
        byte[] imageInByte;
        imageInByte = Files.readAllBytes(Paths.get(imagePath));
        return imageInByte;
    }

    public void byteArrayToImage(byte[] imageData){
        String formatName = "PNG";
        try {
            BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(imageData));
            File outputImage = new File("/Users/choiminsik/Downloads/outputImage.png"); // 저장할 파일 경로 및 이름
            ImageIO.write(bufferedImage, formatName, outputImage);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
