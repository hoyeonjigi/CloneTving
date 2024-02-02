package site.hoyeonjigi.clonetving.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.hoyeonjigi.clonetving.domain.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{

    Optional<UserEntity> findByUserId(String userId);
    
    //유저 리프레시 토큰 데이터 업데이트
    @Modifying
    @Query(value = "update UserEntity u set u.refreshToken = :refreshToken WHERE u.userId = :userId")
    void updateRefreshToken(String refreshToken, String userId);

}
