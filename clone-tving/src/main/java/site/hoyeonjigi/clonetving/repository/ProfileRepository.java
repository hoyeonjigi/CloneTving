package site.hoyeonjigi.clonetving.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.domain.ProfileEntityPK;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import java.util.List;

public interface ProfileRepository extends JpaRepository<ProfileEntity, ProfileEntityPK>{
    Optional<ProfileEntity> findByUserAndProfileName(UserEntity user, String ProfileName);
    List<ProfileEntity> findByUser(UserEntity user);

    @Query(value ="delete from ProfileEntity p WHERE p.profileName = :profileName AND p.user.userId = :userId")
    void deleteByUserAndProfileName(String profileName, String userId);
}
