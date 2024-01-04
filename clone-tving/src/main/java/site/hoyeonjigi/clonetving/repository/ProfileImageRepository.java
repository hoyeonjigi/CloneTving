package site.hoyeonjigi.clonetving.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImageEntity, String> {
    
}
