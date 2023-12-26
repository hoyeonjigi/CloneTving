package site.hoyeonjigi.clonetving.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import site.hoyeonjigi.clonetving.domain.ContentsEntity;
import site.hoyeonjigi.clonetving.domain.ContentsGenreEntity;

public interface ContentGenreRepository extends JpaRepository<ContentsGenreEntity,ContentsEntity> {
    
}
