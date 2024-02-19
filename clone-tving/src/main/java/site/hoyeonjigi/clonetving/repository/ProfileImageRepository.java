package site.hoyeonjigi.clonetving.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImageEntity, String> {
    
    ProfileImageEntity findByImageId(String imageId);
    ProfileImageEntity findByImageName(String imageName);
    List<ProfileImageEntity> findAll();
}
