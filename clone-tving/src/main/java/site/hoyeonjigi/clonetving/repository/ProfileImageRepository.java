package site.hoyeonjigi.clonetving.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImageEntity, String> {
    
    ProfileImageEntity findByImageId(String imageId);
    ProfileImageEntity findByImageName(String imageName);
}
