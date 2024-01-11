package site.hoyeonjigi.clonetving.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{

    UserEntity findByUserId(String userId);
}
