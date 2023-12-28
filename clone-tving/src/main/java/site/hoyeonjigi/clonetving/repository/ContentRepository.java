package site.hoyeonjigi.clonetving.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.ContentEntity;


@Repository
public interface ContentRepository extends JpaRepository<ContentEntity, String>{
    List<ContentEntity> findFirst20ByContentClassificationOrderByContentReleaseDateDesc(String classification);
}
