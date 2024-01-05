package site.hoyeonjigi.clonetving.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImageEntity, String> {
    
    @Query(value = "select pi from ProfileImageEntity pi where pi.imageId = :imageId")
    List<ProfileImageEntity> findProfileImage(@Param("imageId")String imageId);
}
