package site.hoyeonjigi.clonetving.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{
    
}
